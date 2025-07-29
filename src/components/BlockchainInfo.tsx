import React, { useState } from 'react';
import { useBlockchain } from '../blockchain/BlockchainContext';
import { Database, ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';

const BlockchainInfo: React.FC = () => {
  const { blockchain } = useBlockchain();
  const [isExpanded, setIsExpanded] = useState(false);
  const isValid = blockchain.isChainValid();
  const blockCount = blockchain.chain.length;
  const pendingCount = blockchain.pendingPosts.length;
  const difficulty = blockchain.difficulty;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Database className="h-5 w-5 mr-2 text-blue-600" />
          <h2 className="font-semibold">Blockchain Status</h2>
        </div>
        <div className="flex items-center">
          {isValid ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500 mr-2" />
          )}
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="text-sm text-gray-500">Blocks</p>
              <p className="text-xl font-semibold">{blockCount}</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-semibold">{pendingCount}</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="text-xl font-semibold">{difficulty}</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="text-sm text-gray-500">Chain Status</p>
              <p className={`text-xl font-semibold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                {isValid ? 'Valid' : 'Invalid'}
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Blockchain Principles</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Cryptographic Hashing:</strong> Ensures data security and immutability</li>
              <li>• <strong>Proof-of-Work:</strong> Prevents spam and secures message validation</li>
              <li>• <strong>Decentralized Storage:</strong> Eliminates reliance on a single entity</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainInfo;