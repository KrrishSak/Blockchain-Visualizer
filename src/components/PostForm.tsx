import React, { useState } from 'react';
import { useBlockchain } from '../blockchain/BlockchainContext';
import { Send } from 'lucide-react';

const PostForm: React.FC = () => {
  const [content, setContent] = useState('');
  const { addPost, username } = useBlockchain();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && username) {
      addPost(content);
      setContent('');
    }
  };

  if (!username) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <p className="text-yellow-800">Please set a username to start posting.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="mb-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Posts will be added to the blockchain after mining
        </p>
        <button
          type="submit"
          disabled={!content.trim()}
          className={`flex items-center px-4 py-2 rounded-lg ${
            content.trim()
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Send className="h-4 w-4 mr-2" />
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;