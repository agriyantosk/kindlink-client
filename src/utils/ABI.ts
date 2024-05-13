export const kindlinkAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "listedFoundationContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "listedFoundationOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "listedFoundationCoOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "candidateFoundationOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "candidateFoundationCoOwnerAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "foundationAddress",
        "type": "address"
      }
    ],
    "name": "AddCandidates",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "foundationAddress",
        "type": "address"
      }
    ],
    "name": "ApproveWithdrawal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "foundation",
        "type": "address"
      }
    ],
    "name": "ConfirmCandidateApproval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "foundation",
        "type": "address"
      }
    ],
    "name": "ConfirmCandidateDisapproval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "foundation",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Donate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "candidateAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "vote",
        "type": "bool"
      }
    ],
    "name": "Vote",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "foundationAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "foundationAddress",
        "type": "address"
      }
    ],
    "name": "WithdrawalRequest",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "foundationOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "foundationCoOwnerAddress",
        "type": "address"
      }
    ],
    "name": "addCandidates",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "foundationOwnerAddress",
        "type": "address"
      }
    ],
    "name": "approveCandidate",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "address",
        "name": "foundationOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "foundationCoOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "endVotingTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "yesVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "noVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "foundationOwnerAddress",
        "type": "address"
      }
    ],
    "name": "delegateApprove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "foundationAddress",
        "type": "address"
      }
    ],
    "name": "delegateWithdrawal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "foundationOwnerAddress",
        "type": "address"
      }
    ],
    "name": "delegateWithdrawalRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "foundationAddress",
        "type": "address"
      }
    ],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "foundations",
    "outputs": [
      {
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "foundationOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "foundationCoOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "totalInvolvedParticipants",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endVotingTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "contractAddresses",
        "type": "address[]"
      }
    ],
    "name": "getAllCandidatesWithVotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "foundationOwnerAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "foundationCoOwnerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "endVotingTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "yesVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "noVotes",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "hasVoted",
            "type": "bool"
          }
        ],
        "internalType": "struct Kindlink.FoundationCandidateWithVote[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "contractAddresses",
        "type": "address[]"
      }
    ],
    "name": "getAllFoundationEndVoteTime",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "foundationOwnerAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "foundationCoOwnerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "totalInvolvedParticipants",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endVotingTime",
            "type": "uint256"
          }
        ],
        "internalType": "struct Kindlink.ListedFoundation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isVoted",
    "outputs": [
      {
        "internalType": "address",
        "name": "foundationOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isVoted",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "totalUsersDonations",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "inputVote",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "foundationOwnerAddress",
        "type": "address"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const foundationABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_foundationOwnerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_foundationCoOnwerAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "approval",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "approvalRequirement",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "foundationCoOnwerAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "foundationOwnerAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getApprovalState",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isRequestWithdrawal",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "kindlinkApproval",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "foundationOwnerApproval",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "foundationCoOwnerApproval",
            "type": "bool"
          }
        ],
        "internalType": "struct Foundation.ApprovalState",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasApproved",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isRequestWithdrawal",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "kindlinkAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "requestWithdrawal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]