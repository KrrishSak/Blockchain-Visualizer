import React from 'react';
import { BlockchainProvider } from './blockchain/BlockchainContext';
import Header from './components/Header';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MiningControl from './components/MiningControl';
import BlockchainInfo from './components/BlockchainInfo';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <BlockchainProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <div className="max-w-2xl mx-auto">
            <BlockchainInfo />
            <PostForm />
            <PostList />
          </div>
        </main>
        <MiningControl />
        <ChatInterface />
      </div>
    </BlockchainProvider>
  );
}

export default App;