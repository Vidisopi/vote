// ── 1. Beállítások ──
const CONTRACT_ADDRESS = "0xBe3af6C80a9602B5326571f7Ab6882147845F735"; // ide jön a telepített contract címe

const BASE = {
  chainId: 8453,
  chainIdHex: "0x2105",
  name: "Base",
  rpc: "https://mainnet.base.org",
  explorer: "https://basescan.org",
};

// ── 2. ABI: a contract függvényei ──
const ABI = [
  "function pollCount() view returns (uint256)",
  "function getPoll(uint256 pollId) view returns (string question, string[] options, uint256[] counts, address creator, uint256 deadline)",
  "function ballots(uint256 pollId, address voter) view returns (bool voted, bool changed, uint256 option)",
  "function createPoll(string question, string[] options, uint256 durationMinutes) returns (uint256)",
  "function vote(uint256 pollId, uint256 option)",
  "function changeVote(uint256 pollId, uint256 newOption)",
];

// ── 3. Kapcsolat a lánccal ──
const publicProvider = new ethers.JsonRpcProvider(BASE.rpc, BASE.chainId, { staticNetwork: true });
let contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, publicProvider); // csak olvasásra
let myAddress = null;
let polls = [];
let busy = false;

// ── 4. MetaMask csatlakozás ──
async function connectWallet() {
  if (!window.ethereum) {
    showStatus("error", "Nem található MetaMask. Telepítsd a böngésződbe, majd töltsd újra az oldalt.");
    return;
  }
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    await switchToBase();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    myAddress = await signer.getAddress();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer); // olvasás + írás

    renderWallet();
    await loadPolls();
  } catch (err) {
    showStatus("error", readableError(err));
  }
}

// ── 5. Hálózatváltás Base-re ──
async function switchToBase() {
  const current = await window.ethereum.request({ method: "eth_chainId" });
  if (current === BASE.chainIdHex) return;
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BASE.chainIdHex }],
    });
  } catch (err) {
    if (err.code !== 4902) throw err; // 4902: a MetaMask még nem ismeri a hálózatot
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: BASE.chainIdHex,
        chainName: BASE.name,
        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        rpcUrls: [BASE.rpc],
        blockExplorerUrls: [BASE.explorer],
      }],
    });
  }
}

// ── 6. Szavazások beolvasása ──
async function loadPolls() {
  try {
    const count = Number(await contract.pollCount());
    const ids = [];
    for (let id = count - 1; id >= 0; id--) ids.push(id); // a legújabb legyen elöl

    polls = await Promise.all(ids.map(async (id) => {
      const p = await contract.getPoll(id);
      const ballot = myAddress ? await contract.ballots(id, myAddress) : null;
      return {
        id,
        question: p.question,
        options: [...p.options],
        counts: p.counts.map(Number),
        creator: p.creator,
        deadline: Number(p.deadline),
        voted: ballot ? ballot.voted : false,
        changed: ballot ? ballot.changed : false,
        myOption: ballot ? Number(ballot.option) : null,
      };
    }));
    renderPolls();
  } catch (err) {
    showStatus("error", "Nem sikerült beolvasni a szavazásokat: " + readableError(err));
  }
}

// ── 7. Írás: tranzakciók ──
async function createPoll(question, options, minutes) {
  return sendTx("Szavazás létrehozása", () => contract.createPoll(question, options, minutes));
}

async function castVote(pollId, option) {
  return sendTx("Szavazat leadása", () => contract.vote(pollId, option));
}

async function changeVote(pollId, option) {
  return sendTx("Szavazat módosítása", () => contract.changeVote(pollId, option));
}

async function sendTx(label, txFunction) {
  if (!myAddress) {
    showStatus("error", "Előbb csatlakoztasd a MetaMaskot.");
    return false;
  }
  setBusy(true);
  try {
    showStatus("wait", label + ": hagyd jóvá a MetaMaskban…");
    const tx = await txFunction();
    showStatus("wait", label + ": elküldve, a blokkba kerülésre vár…", tx.hash);
    await tx.wait();
    await loadPolls();
    showStatus("ok", label + ": sikeres, bekerült a blokkláncba.", tx.hash);
    return true;
  } catch (err) {
    showStatus("error", label + ": " + readableError(err));
    return false;
  } finally {
    setBusy(false);
  }
}

// ── 8. Érthető hibaüzenetek ──
function readableError(err) {
  if (err.code === "ACTION_REJECTED" || err.code === 4001) return "elutasítottad a MetaMaskban.";
  if (err.code === "INSUFFICIENT_FUNDS") return "nincs elég ETH a tranzakciós díjra.";
  if (err.reason) return "a contract visszautasította: „" + err.reason + "”";
  return err.shortMessage || err.message || String(err);
}

// ── 9. Megjelenítés ──

function esc(text) {
  // Bárki létrehozhat szavazást, ezért a szöveget sosem illesztjük be HTML-ként.
  return String(text)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function shortAddress(address) {
  return address.slice(0, 6) + "…" + address.slice(-4);
}

function timeLeft(deadline) {
  let s = deadline - Math.floor(Date.now() / 1000);
  if (s <= 0) return null;
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600); s %= 3600;
  const m = Math.floor(s / 60); s %= 60;
  if (d > 0) return d + " nap " + h + " óra";
  if (h > 0) return h + " óra " + m + " perc";
  return m + ":" + String(s).padStart(2, "0");
}

function renderPolls() {
  const list = document.getElementById("polls");
  document.getElementById("poll-count").textContent = polls.length;
  if (polls.length === 0) {
    list.innerHTML = `<p class="empty">Még nincs szavazás. Hozd létre az elsőt a bal oldali űrlappal!</p>`;
    return;
  }
  list.innerHTML = polls.map(pollCard).join("");
  if (busy) list.querySelectorAll("button").forEach((b) => { b.disabled = true; });
}

function pollCard(p) {
  const open = timeLeft(p.deadline) !== null;
  const total = p.counts.reduce((a, b) => a + b, 0);
  const max = Math.max(...p.counts);
  const mine = myAddress && p.creator.toLowerCase() === myAddress.toLowerCase();

  let hint = "";
  if (!open) hint = "A szavazás lezárult.";
  else if (!myAddress) hint = "Csatlakozz a MetaMaskkal a szavazáshoz.";
  else if (!p.voted) hint = "Válassz egy opciót.";
  else if (!p.changed) hint = "Egyszer még átszavazhatsz másik opcióra.";
  else hint = "Már módosítottad a szavazatodat, ez a végleges.";

  const rows = p.options.map((opt, i) => {
    const pct = total ? Math.round((p.counts[i] / total) * 100) : 0;
    const isMine = p.voted && p.myOption === i;
    const leader = !open && total > 0 && p.counts[i] === max;
    let action = "";
    if (open && myAddress) {
      if (!p.voted) action = `<button class="opt-btn" data-act="vote" data-poll="${p.id}" data-opt="${i}">Szavazok</button>`;
      else if (!p.changed && !isMine) action = `<button class="opt-btn ghost" data-act="change" data-poll="${p.id}" data-opt="${i}">Átszavazok</button>`;
    }
    return `<li class="opt${isMine ? " mine" : ""}${leader ? " lead" : ""}">
      <div class="opt-top">
        <span class="opt-name">${esc(opt)}${isMine ? ` <span class="tag">a te szavazatod</span>` : ""}${leader ? ` <span class="tag win">nyertes</span>` : ""}</span>
        <span class="opt-num">${p.counts[i]} <small>${pct}%</small></span>
      </div>
      <div class="bar"><i style="width:${pct}%"></i></div>
      ${action}
    </li>`;
  }).join("");

  return `<article class="poll">
    <header class="poll-head">
      <span class="pid">#${p.id}</span>
      <span class="state ${open ? "open" : "closed"}" data-deadline="${p.deadline}">${open ? "Nyitott · " + timeLeft(p.deadline) : "Lezárult"}</span>
    </header>
    <h3>${esc(p.question)}</h3>
    <p class="meta">Létrehozta: <a href="${BASE.explorer}/address/${p.creator}" target="_blank" rel="noopener">${mine ? "te" : shortAddress(p.creator)}</a> · ${total} szavazat · határidő: ${new Date(p.deadline * 1000).toLocaleString("hu-HU")}</p>
    <ul class="opts">${rows}</ul>
    <p class="hint">${hint}</p>
  </article>`;
}

function renderWallet() {
  document.getElementById("connect").hidden = true;
  const w = document.getElementById("wallet");
  w.hidden = false;
  document.getElementById("wallet-addr").textContent = shortAddress(myAddress);
  document.getElementById("wallet-addr").href = BASE.explorer + "/address/" + myAddress;
}

function showStatus(kind, message, txHash) {
  const box = document.getElementById("status");
  box.className = "status " + kind;
  box.hidden = false;
  document.getElementById("status-text").innerHTML = esc(message) +
    (txHash ? ` <a href="${BASE.explorer}/tx/${txHash}" target="_blank" rel="noopener">Megnézem a Basescanen ↗</a>` : "");
}

function setBusy(value) {
  busy = value;
  document.querySelectorAll("button").forEach((b) => { if (b.id !== "status-close") b.disabled = value; });
  if (!value) updateOptionControls();
}

// ── 10. Az űrlap és a gombok ──
function addOptionInput(value = "") {
  const box = document.getElementById("options");
  if (box.children.length >= 8) return;
  const row = document.createElement("div");
  row.className = "opt-input";
  row.innerHTML = `<input type="text" maxlength="64" placeholder="${box.children.length + 1}. opció" required>
    <button type="button" class="remove" aria-label="Opció törlése">×</button>`;
  row.querySelector("input").value = value;
  row.querySelector(".remove").onclick = () => {
    if (box.children.length > 2) row.remove();
    updateOptionControls();
  };
  box.appendChild(row);
  updateOptionControls();
}

function updateOptionControls() {
  const box = document.getElementById("options");
  document.getElementById("add-option").disabled = box.children.length >= 8;
  [...box.querySelectorAll("input")].forEach((inp, i) => { inp.placeholder = (i + 1) + ". opció"; });
}

function byteLength(text) {
  return new TextEncoder().encode(text).length; // az ékezetes betű 2 bájt
}

document.getElementById("create-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = document.getElementById("question").value.trim();
  const options = [...document.querySelectorAll("#options input")].map((i) => i.value.trim()).filter(Boolean);
  const minutes = Number(document.getElementById("duration").value);

  if (byteLength(question) > 200) return showStatus("error", "A kérdés túl hosszú (legfeljebb 200 bájt).");
  if (options.length < 2) return showStatus("error", "Adj meg legalább 2 opciót.");
  if (options.some((o) => byteLength(o) > 64)) return showStatus("error", "Egy opció legfeljebb 64 bájt lehet.");

  const ok = await createPoll(question, options, minutes);
  if (ok) {
    e.target.reset();
    document.getElementById("options").innerHTML = "";
    addOptionInput(); addOptionInput();
  }
});

document.getElementById("add-option").addEventListener("click", () => addOptionInput());
document.getElementById("connect").addEventListener("click", connectWallet);
document.getElementById("refresh").addEventListener("click", loadPolls);
document.getElementById("status-close").addEventListener("click", () => { document.getElementById("status").hidden = true; });

document.getElementById("polls").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-act]");
  if (!btn) return;
  const pollId = Number(btn.dataset.poll);
  const option = Number(btn.dataset.opt);
  if (btn.dataset.act === "vote") castVote(pollId, option);
  else changeVote(pollId, option);
});

// ── 11. Indulás ──
if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => window.location.reload());
  window.ethereum.on("chainChanged", () => window.location.reload());
}

setInterval(() => {
  // a visszaszámlálók frissítése másodpercenként
  document.querySelectorAll(".state[data-deadline]").forEach((el) => {
    const left = timeLeft(Number(el.dataset.deadline));
    if (left) el.textContent = "Nyitott · " + left;
    else if (el.classList.contains("open")) renderPolls();
  });
}, 1000);

setInterval(loadPolls, 20000); // 20 másodpercenként új adatok a láncról

addOptionInput(); addOptionInput();
if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
  showStatus("error", "Az app.js-ben még nincs beállítva a contract címe (CONTRACT_ADDRESS).");
} else {
  loadPolls();
}
