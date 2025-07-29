/**
 * Block class representing a single block in the blockchain
 */
export interface BlockData {
  id: string;
  timestamp: number;
  content: string;
  author: string;
  previousHash: string;
  hash: string;
  nonce: number;
}

export class Block {
  id: string;
  timestamp: number;
  content: string;
  author: string;
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(
    id: string,
    timestamp: number,
    content: string,
    author: string,
    previousHash = ''
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.content = content;
    this.author = author;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  /**
   * Calculate the hash of the block using its properties
   */
  calculateHash(): string {
    const data = this.id + this.timestamp + this.content + this.author + this.previousHash + this.nonce;
    // Simple hash function for demonstration purposes
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
  }

  /**
   * Mine the block with a specific difficulty (Proof of Work)
   * @param difficulty The number of leading zeros required in the hash
   */
  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join('0');
    
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    
    console.log(`Block mined: ${this.hash}`);
  }

  /**
   * Convert block to a serializable object
   */
  toObject(): BlockData {
    return {
      id: this.id,
      timestamp: this.timestamp,
      content: this.content,
      author: this.author,
      previousHash: this.previousHash,
      hash: this.hash,
      nonce: this.nonce
    };
  }
}