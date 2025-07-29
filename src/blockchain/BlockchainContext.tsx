import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Blockchain } from './Blockchain';
import { Block, BlockData } from './Block';
import { MessageData } from './Message';

interface BlockchainContextType {
  blockchain: Blockchain;
  posts: BlockData[];
  username: string;
  setUsername: (name: string) => void;
  addPost: (content: string) => void;
  mineBlocks: () => void;
  isLoading: boolean;
  sendMessage: (recipient: string, content: string) => void;
  getConversation: (otherUser: string) => MessageData[];
  getMessagedUsers: () => string[];
  activeChat: string | null;
  setActiveChat: (username: string | null) => void;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

interface BlockchainProviderProps {
  children: ReactNode;
}

export const BlockchainProvider: React.FC<BlockchainProviderProps> = ({ children }) => {
  const [blockchain, setBlockchain] = useState<Blockchain>(() => {
    // Try to load from localStorage
    const savedChain = localStorage.getItem('blockchain');
    if (savedChain) {
      try {
        return Blockchain.fromJSON(savedChain);
      } catch (error) {
        console.error('Failed to load blockchain from storage:', error);
        return new Blockchain();
      }
    }
    return new Blockchain();
  });
  
  const [posts, setPosts] = useState<BlockData[]>([]);
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  // Save blockchain to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('blockchain', blockchain.toJSON());
      setPosts(blockchain.getAllPosts().reverse()); // Newest first
    } catch (error) {
      console.error('Failed to save blockchain to storage:', error);
    }
  }, [blockchain]);

  // Load username from localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  // Save username to localStorage
  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    }
  }, [username]);

  const addPost = (content: string) => {
    if (!content.trim() || !username) return;
    
    // Create a deep copy of the blockchain to avoid mutation issues
    const newBlockchain = new Blockchain();
    // Copy chain
    newBlockchain.chain = blockchain.chain.map(block => {
      const newBlock = new Block(
        block.id,
        block.timestamp,
        block.content,
        block.author,
        block.previousHash
      );
      newBlock.hash = block.hash;
      newBlock.nonce = block.nonce;
      return newBlock;
    });
    
    // Copy pending posts
    newBlockchain.pendingPosts = blockchain.pendingPosts.map(block => {
      const newBlock = new Block(
        block.id,
        block.timestamp,
        block.content,
        block.author,
        block.previousHash
      );
      newBlock.hash = block.hash;
      newBlock.nonce = block.nonce;
      return newBlock;
    });
    
    // Copy messages
    newBlockchain.messages = blockchain.messages.map(msg => 
      new Message(msg.id, msg.sender, msg.recipient, msg.content, msg.timestamp)
    );
    
    newBlockchain.difficulty = blockchain.difficulty;
    
    // Add the new post
    newBlockchain.createPost(content, username);
    setBlockchain(newBlockchain);
  };

  const mineBlocks = () => {
    if (blockchain.pendingPosts.length === 0) return;
    
    setIsLoading(true);
    
    // Use setTimeout to allow UI to update before mining starts
    setTimeout(() => {
      try {
        // Create a deep copy of the blockchain to avoid mutation issues
        const newBlockchain = new Blockchain();
        // Copy chain
        newBlockchain.chain = blockchain.chain.map(block => {
          const newBlock = new Block(
            block.id,
            block.timestamp,
            block.content,
            block.author,
            block.previousHash
          );
          newBlock.hash = block.hash;
          newBlock.nonce = block.nonce;
          return newBlock;
        });
        
        // Copy pending posts
        newBlockchain.pendingPosts = blockchain.pendingPosts.map(block => {
          const newBlock = new Block(
            block.id,
            block.timestamp,
            block.content,
            block.author,
            block.previousHash
          );
          newBlock.hash = block.hash;
          newBlock.nonce = block.nonce;
          return newBlock;
        });
        
        // Copy messages
        newBlockchain.messages = blockchain.messages.map(msg => 
          new Message(msg.id, msg.sender, msg.recipient, msg.content, msg.timestamp)
        );
        
        newBlockchain.difficulty = blockchain.difficulty;
        
        // Mine the blocks
        newBlockchain.minePendingPosts(username || 'System');
        setBlockchain(newBlockchain);
      } finally {
        setIsLoading(false);
      }
    }, 100);
  };

  const sendMessage = (recipient: string, content: string) => {
    if (!content.trim() || !username || !recipient) return;
    
    // Create a deep copy of the blockchain to avoid mutation issues
    const newBlockchain = new Blockchain();
    // Copy chain
    newBlockchain.chain = blockchain.chain.map(block => {
      const newBlock = new Block(
        block.id,
        block.timestamp,
        block.content,
        block.author,
        block.previousHash
      );
      newBlock.hash = block.hash;
      newBlock.nonce = block.nonce;
      return newBlock;
    });
    
    // Copy pending posts
    newBlockchain.pendingPosts = blockchain.pendingPosts.map(block => {
      const newBlock = new Block(
        block.id,
        block.timestamp,
        block.content,
        block.author,
        block.previousHash
      );
      newBlock.hash = block.hash;
      newBlock.nonce = block.nonce;
      return newBlock;
    });
    
    // Copy messages
    newBlockchain.messages = blockchain.messages.map(msg => 
      new Message(msg.id, msg.sender, msg.recipient, msg.content, msg.timestamp)
    );
    
    newBlockchain.difficulty = blockchain.difficulty;
    
    // Send the message
    newBlockchain.sendMessage(username, recipient, content);
    setBlockchain(newBlockchain);
  };

  const getConversation = (otherUser: string): MessageData[] => {
    if (!username || !otherUser) return [];
    return blockchain.getConversation(username, otherUser);
  };

  const getMessagedUsers = (): string[] => {
    if (!username) return [];
    return blockchain.getMessagedUsers(username);
  };

  return (
    <BlockchainContext.Provider
      value={{
        blockchain,
        posts,
        username,
        setUsername,
        addPost,
        mineBlocks,
        isLoading,
        sendMessage,
        getConversation,
        getMessagedUsers,
        activeChat,
        setActiveChat
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};