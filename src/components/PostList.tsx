import React from 'react';
import { useBlockchain } from '../blockchain/BlockchainContext';
import { Clock, User } from 'lucide-react';

const PostList: React.FC = () => {
  const { posts, blockchain } = useBlockchain();

  if (posts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No posts yet. Be the first to post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.hash} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="font-semibold">@{post.author}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{new Date(post.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="text-xs bg-gray-100 px-2 py-1 rounded">
              Block #{post.id}
            </div>
          </div>
          
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
          
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <div className="bg-gray-100 px-2 py-1 rounded">
                Hash: {post.hash.substring(0, 10)}...
              </div>
              <div className="bg-gray-100 px-2 py-1 rounded">
                Previous: {post.previousHash.substring(0, 6)}...
              </div>
              <div className="bg-gray-100 px-2 py-1 rounded">
                Nonce: {post.nonce}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;