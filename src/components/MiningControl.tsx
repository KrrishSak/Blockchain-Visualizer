import React from 'react';
import { useBlockchain } from '../blockchain/BlockchainContext';
import { Pickaxe, Loader2 } from 'lucide-react';

const MiningControl: React.FC = () => {
  const { blockchain, mineBlocks, isLoading } = useBlockchain();
  const pendingCount = blockchain.pendingPosts.length;

  if (pendingCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="mb-2">
        <p className="text-sm font-medium">
          {pendingCount} pending {pendingCount === 1 ? 'post' : 'posts'} waiting to be mined
        </p>
        <p className="text-xs text-gray-500">
          Mining adds posts to the blockchain using Proof-of-Work
        </p>
      </div>
      <button
        onClick={mineBlocks}
        disabled={isLoading}
        className={`w-full flex items-center justify-center px-4 py-2 rounded-full ${
          isLoading
            ? 'bg-gray-300 text-gray-600'
            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Mining...
          </>
        ) : (
          <>
            <Pickaxe className="h-4 w-4 mr-2" />
            Mine Posts
          </>
        )}
      </button>
    </div>
  );
};

export default MiningControl;