pragma solidity ^0.4.4;
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract DeCAPTCHA is Ownable {

	struct Answer {
		// hash of the user's response
		bytes32 answerHash;

		// when the answer was submitted
		uint256 timestamp;

		// who submitted the answer
		address creator;
	}

	struct Problem {
		Answer[] answers;

		// how many agreeing responses are required
		uint requiredAgreement;

		// when was the problem made
		uint256 timestamp;

		// who made the problem
		address creator;

		// reward for solving the problem
		uint256 reward;

		// question associated with the problem
		string question;

		// IPFS document associated with the problem
		string ipfsHash;

		// is the problem still active?
		bool active;
	}

	mapping (uint256 => Problem) problems;
	uint256 numQuestions;

	bool useWhitelist;
	mapping (address => bool) whitelist;

	modifier whitelisted() {
		require(!useWhitelist || whitelist[msg.sender]);
		_;
	}

    modifier activeProblem(uint256 problemID) {
        require(problems[problemID].active);
        _;
    }

    modifier problemOwner(uint256 problemID) {
        require(problems[problemID].creator == msg.sender);
        _;
    }

    function hashAnswer(string answer, uint256 timestamp)
    	internal
    	pure
    	returns (bytes32)
    {
    	return keccak256(answer, timestamp);
    }

	function submitProblem(string question, string ipfsHash)
		public
		whitelisted()
		payable
	{
		// initialize the new problem
		Problem memory prob = problems[numQuestions];

		// set properties on the problem
		prob.timestamp = now;
		prob.question = question;
		prob.ipfsHash = ipfsHash;
		prob.creator = msg.sender;
		prob.reward = msg.value;
		prob.active = true;

		// increment the number of questions
		// that we have stored
		numQuestions += 1;
	}

	function deactivateProblem(uint256 problemID)
		public
		activeProblem(problemID)
		problemOwner(problemID)
	{
		problems[numQuestions].active = false;
	}

	// tries to collect the reward on the problem on behalf of the
	// message sender
	function solvedProblem(Problem problem, string answer)
		internal
		pure
		returns (bool)
	{
		uint agreement = 0;

		uint numAnswers = problem.answers.length;
		for (uint i = 0; i < numAnswers; i++) {

			Answer memory otherAnswer = problem.answers[i];

			// do the answers match?
			if (otherAnswer.answerHash == hashAnswer(answer, otherAnswer.timestamp)) {
				agreement += 1;
			}
		}

		// determine whether or not a sufficient number of
		// answers agree with you
		return (agreement >= problem.requiredAgreement);
	}

	function answerQuestion(uint256 problemID, string answer, address rewardAddress)
		public
		activeProblem(problemID)
	{

		// initialize the empty answer
		Problem storage prob = problems[problemID];
		Answer storage answerStruct = prob.answers[prob.answers.length];

		// set properties on the answer
		answerStruct.timestamp = now;
		answerStruct.answerHash = hashAnswer(answer, answerStruct.timestamp);
		answerStruct.creator = msg.sender;

		// check if we can collect the reward
		if (solvedProblem(prob, answer)) {
			prob.active = false;
			rewardAddress.transfer(prob.reward);
		}
	}

}