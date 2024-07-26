import crypto from "crypto"; // to use createHash

// Define the structure of Block in Blockchain
interface BlockShape {
  hash: string; // Current block's hash
  prevHash: string; // Previous block's hash
  height: number; // Block number
  data: string;
}

// Represents a single block
class Block implements BlockShape {
  public hash: string;
  // Calculates the current block's hash using these values.
  constructor(
    public prevHash: string, // To link new block to previous block (for security reason)
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  // static method generates a SHA-256 hash
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    // Finalizes the hash computation and outputs the resulting hash in hexadecimal format
    return crypto.createHash("sha256").update(toHash).digest("hex"); // sha256 = Secure password hashing
  }
}

class Blockchain {
  private blocks: Block[]; // Private array to store blocks
  // To initialise an empty array for the blocks
  constructor() {
    this.blocks = [];
  }
  // Returns the hash of the last block in the chain
  private getPrevHash() {
    if(this.blocks.length === 0) return "" // if chain is empty, return empty string
    return this.blocks[this.blocks.length - 1].hash; // Previous block's hash
  }
  // Create new block (add to the blockchain)
  public addBlock(data: string) {
    const block = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(block);
  }
  // Public method returns a copy of the array of blocks
  public getBlocks() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();

// Example of new blockchain
blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

console.log(blockchain.getBlocks());