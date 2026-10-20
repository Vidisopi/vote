// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Szavazas {
    struct Poll {
        string question;
        string[] options;
        uint256[] counts;
        address creator;
        uint256 deadline;
    }

    struct Ballot {
        bool voted;
        bool changed;
        uint256 option;
    }

    Poll[] private polls;
    mapping(uint256 => mapping(address => Ballot)) public ballots;

    event PollCreated(
        uint256 indexed pollId,
        address indexed creator,
        string question,
        uint256 deadline
    );
    event Voted(uint256 indexed pollId, address indexed voter, uint256 option);
    event VoteChanged(
        uint256 indexed pollId,
        address indexed voter,
        uint256 oldOption,
        uint256 newOption
    );

    modifier openPoll(uint256 pollId) {
        require(pollId < polls.length, "Nincs ilyen szavazas");
        require(block.timestamp < polls[pollId].deadline, "A szavazas lezarult");
        _;
    }

    function createPoll(
        string calldata question,
        string[] calldata options,
        uint256 durationMinutes
    ) external returns (uint256 pollId) {
        require(bytes(question).length > 0, "Ures a kerdes");
        require(bytes(question).length <= 200, "Tul hosszu a kerdes");
        require(options.length >= 2, "Legalabb 2 opcio kell");
        require(options.length <= 8, "Legfeljebb 8 opcio lehet");
        require(durationMinutes >= 1, "Legalabb 1 perc");
        require(durationMinutes <= 43200, "Legfeljebb 30 nap");

        pollId = polls.length;
        Poll storage p = polls.push();
        p.question = question;
        p.creator = msg.sender;
        p.deadline = block.timestamp + durationMinutes * 1 minutes;

        for (uint256 i = 0; i < options.length; i++) {
            require(bytes(options[i]).length > 0, "Ures opcio");
            require(bytes(options[i]).length <= 64, "Tul hosszu opcio");
            p.options.push(options[i]);
            p.counts.push(0);
        }

        emit PollCreated(pollId, msg.sender, question, p.deadline);
    }

    function vote(uint256 pollId, uint256 option) external openPoll(pollId) {
        Poll storage p = polls[pollId];
        Ballot storage b = ballots[pollId][msg.sender];
        require(!b.voted, "Mar szavaztal");
        require(option < p.options.length, "Nincs ilyen opcio");

        b.voted = true;
        b.option = option;
        p.counts[option] += 1;

        emit Voted(pollId, msg.sender, option);
    }

    function changeVote(uint256 pollId, uint256 newOption) external openPoll(pollId) {
        Poll storage p = polls[pollId];
        Ballot storage b = ballots[pollId][msg.sender];
        require(b.voted, "Meg nem szavaztal");
        require(!b.changed, "Mar modositottal egyszer");
        require(newOption < p.options.length, "Nincs ilyen opcio");
        require(newOption != b.option, "Mar erre szavaztal");

        uint256 oldOption = b.option;
        p.counts[oldOption] -= 1;
        p.counts[newOption] += 1;
        b.option = newOption;
        b.changed = true;

        emit VoteChanged(pollId, msg.sender, oldOption, newOption);
    }

    function pollCount() external view returns (uint256) {
        return polls.length;
    }

    function getPoll(uint256 pollId)
        external
        view
        returns (
            string memory question,
            string[] memory options,
            uint256[] memory counts,
            address creator,
            uint256 deadline
        )
    {
        require(pollId < polls.length, "Nincs ilyen szavazas");
        Poll storage p = polls[pollId];
        return (p.question, p.options, p.counts, p.creator, p.deadline);
    }
}
