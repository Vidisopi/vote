# Egyszerű szavazás (1 cím = 1 szavazat) — oktatási demó

```text
⠻⣿⣮⡙⠷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⠻⣷⣦⡈⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⢿⣿⠀⠀⠀⠀⠀⣀⣤⠶⢦⣤⡀⠀⠀⠀⠀⢸⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠹⣿⣿⡄⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⡇⠀⠀⠀⠀⣾⣿⣄⣼⣄⣌⣿⣆⠀⠀⠀⠈⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠘⢿⣿⣄⠀⠀⠈⠢⣄⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣷⡀⠀⠀⣼⣿⣿⣿⡿⠛⣿⣿⣿⡄⠀⠀⢸⣿⣿⣿⠁⠀⠀⢠⣤⡖⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⢻⣿⣦⠀⠀⠀⠈⠑⢄⡀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣷⣤⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⣴⣿⣿⣿⡟⠀⠀⢀⣾⡟⣰⣿⣾⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣷⣀⠀⠀⠀⠀⠉⠢⣀⠀⠀⠀⠀⢘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣹⣿⣿⣯⣿⣿⣏⠀⠀⠀⣼⡿⣱⣿⣿⡽⣷⣶⣶⡧⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣧⡀⠀⠀⠀⠀⠀⠈⠑⢄⡀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣥⣿⣿⣟⣿⣿⣿⣯⣿⣇⠀⢸⡿⢱⣿⣿⣿⡿⣱⣿⠟⣠⣿⣿⣤⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣄⠀⠀⠀⠀⠀⠀⠀⠙⠺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠟⠁⢀⣿⣿⣿⣿⣷⣿⡻⢢⡿⢣⣿⣿⣿⡟⣷⣿⠏⣴⣿⣿⢫⠞⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢟⣻⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣿⣿⣿⣿⡟⠛⠁⠀⡼⠁⣸⠟⣸⢿⢾⡿⢃⣾⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⣸⠃⣰⠏⢰⡿⢡⡟⢡⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣿⣿⣿⣿⣿⣿⣿⣶⠇⣰⠏⢰⠏⣰⠏⣠⢟⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⡿⣷⣄⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣴⠏⣰⣏⡼⣃⣴⣫⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣇⣤⣶⣾⣷⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣦⣼⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣿⣿⡿⢟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣿⣿⣿⡿⣿⢿⣿⣿⣟⣻⣆⡿⣿⣿⣿⣤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⡿⣿⣿⣿⣷⣸⢟⣋⣽⣟⠛⣿⣿⣿⣿⣿⣶⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢫⢿⠃⢻⣿⢿⣿⡷⣼⣟⣽⣾⣯⢻⣿⣿⣿⣿⡟⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣹⣾⣿⣾⣋⣿⡂⢀⡩⣿⣿⡶⣿⣟⣿⣿⣿⣿⣻⢽⣿⣿⣷⣹⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣿⣿⣿⣿⣿⣿⣿⣛⣿⣇⣯⣷⣿⣿⣿⢿⣷⣹⣯⣿⣿⡙⢳⣿⣿⣿⣿⣦⢿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣿⣿⣏⣁⣍⣛⡟⣿⣛⣛⠹⣿⣿⣛⣈⣿⣧⢿⣿⣻⣇⣸⣿⣿⣿⣿⣿⣾⢿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠛⣿⠿⡿⠿⣿⣿⣿⣯⡿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣷⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠳⢄⠀⠀⠀⠀⠀⠀⠀⠀
⣇⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⡇⠈⠻⣿⣿⣿⣿⣿⣿⣏⣽⣤⡄⠑⠦⡀⠀⠀⠀⠀⠀
⣿⡄⠀⠀⠀⠀⠀⢀⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣀⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣆⣈⠲⣄⠀⠀⠀
⣿⣷⠀⠀⠀⠀⣠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⢽⣿⣿⣿⣿⣿⣿⣮⣿⡉⠙⠻⠿⣦⢷⣤⡀
⣿⣿⡇⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠸⠿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠙⠒⢿
⢹⣿⣷⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠘⠁⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⡁⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀
⠈⣿⣿⣟⠋⠙⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⢻⣇⠀⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀
⣠⣾⣿⣿⢷⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡌⠿⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀
⣿⣿⣿⣿⣾⡯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⡇⠀⠀⠀
⢿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣟⢿⣻⣽⣿⣿⣿⣿⡀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀
⠈⠿⡿⠿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣜⣯⣿⣿⣿⣿⣿⡧⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀
```

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)


Milton Friedman Egyetem · Gazdasági informatika · blokklánc gyakorlat

Ez a tároló egy **egyszerű on-chain szavazást** mutat be a **Base** főhálózaton: minden csatlakozó cím **egyszer** szavazhat egy adott szavazáson (és egyszer módosíthat). Nincs token — a súly mindig 1. A cél oktatási: átlátható Solidity, MetaMaskos webes felület, Remixben megnyitható forrás.

Élő demó (GitHub Pages): **https://vidisopi.github.io/vote/**

**Tokensúlyos** változat (külön tároló): [Vidisopi/sulyozott](https://github.com/Vidisopi/sulyozott) · https://vidisopi.github.io/sulyozott/


---

## Mit tanulunk ezzel?

| Fogalom | Hol jelenik meg |
| --- | --- |
| Egyszerű Solidity struktúrák + mapping | `Szavazas.sol` |
| Egy cím = egy szavazat | `ballots` mapping |
| Határidős szavazás | `deadline` + `openPoll` |
| MetaMask + Base | `app.js` |
| ethers.js v6 frontend | `index.html` + `app.js` |

**Szabályok röviden**

1. Bárki indíthat szavazást (kérdés, 2+ opció, időtartam).
2. Nyitott szavazáson a csatlakozó cím egyszer szavazhat.
3. Egyszer még **módosíthatod** a választásodat; utána végleges.
4. Nincs token: minden szavazó súlya 1.

---

## Fájlok

```
.
├── index.html              # webes felület (GitHub Pages)
├── app.js                  # ethers.js + Base cím
├── Szavazas.sol            # szavazás kontrakt
└── README.md
```

---

## Élő kontrakt (Base mainnet)

| Kontrakt | Cím | Basescan |
| --- | --- | --- |
| **Szavazas** | `0xBe3af6C80a9602B5326571f7Ab6882147845F735` | [megnyitás](https://basescan.org/address/0xBe3af6C80a9602B5326571f7Ab6882147845F735) |

A frontend az `app.js` elején lévő `CONTRACT_ADDRESS` konstanssal hívja. Új deploy után cseréld a címet, majd frissül a Pages demó is.

Hálózat: **Base** · chainId `8453` · RPC `https://mainnet.base.org` · https://basescan.org

---

## Diákoknak: MetaMask és a demó

### 1. MetaMask

1. Telepítsd: [metamask.io/download](https://metamask.io/download/) (Chrome / Brave / Firefox).
2. Új tárca vagy import — a **seed phrase csak nálad** legyen, soha ne másold webes űrlapba.

### 2. Base hálózat

A demó **MetaMask csatlakoztatása** gombja átvált / hozzáadja a Base-t. Kézzel:

- Név: `Base`
- RPC: `https://mainnet.base.org`
- Chain ID: `8453`
- Szimbólum: `ETH`
- Explorer: `https://basescan.org`

Tranzakcióhoz kell egy kevés **ETH a Base-en** (gáz).

### 3. Demó

1. Nyisd meg: https://vidisopi.github.io/vote/
2. **MetaMask csatlakoztatása** → engedd.
3. Szavazás indítása (ha gyakoroltok) vagy meglévőn **Szavazok** / **Átszavazok**.
4. Hagyd jóvá a MetaMaskban; a Basescan linken követheted a tx-et.

---

## Remix: `Szavazas.sol`

1. Nyisd meg a [Remix](https://remix.ethereum.org)-et.
2. Másold be a `Szavazas.sol` tartalmát (pragma `^0.8.20`).
3. **Compile** (0.8.20+).
4. **Deploy & Run** → Environment: **Injected Provider - MetaMask**, hálózat: **Base**.
5. Deploy → jegyezd fel a címet → írd be az `app.js` `CONTRACT_ADDRESS` mezőjébe.

Olvasáshoz Remixben „at address” + az élő cím is működik a lefordított ABI-val.

**Figyelem:** mainnet deploy valódi ETH-t költ. Gyakorláshoz Base Sepolia + frontend átírás is oké.

---

## Fork és saját Pages

1. **Fork** ezen a tárolón.
2. Állítsd a saját `CONTRACT_ADDRESS`-t az `app.js`-ben.
3. **Settings → Pages** → branch `main`, mappa `/ (root)`.
4. Demó: `https://<felhasználó>.github.io/vote/` (vagy a fork neve).

---

## Kapcsolódó anyag

- Tokensúlyos (IGOV) demó: https://github.com/Vidisopi/sulyozott

---

## Gyakori hibák

| Tünet | Jelentés |
| --- | --- |
| Nincs MetaMask | Telepítsd a bővítményt, frissítsd az oldalt. |
| elutasítottad… | Visszavontad a tx-et / kapcsolatot. |
| nincs elég ETH | Base-en kell gázdíj. |
| A szavazás lezárult | A `deadline` már elmúlt. |

---

## Licenc

Ez a tároló **[MIT](./LICENSE)** licenc alatt áll: szabadon másolható, módosítható, terjeszthető és kereskedelmi célra is használható, a copyright és a licencszöveg megtartásával. A szoftver „ahogy van” állapotú, garancia nélkül.

Oktatási demó: ne tárolj rajta jelentős értéket; a MetaMask kulcsaidért te felelsz.
