# Blockchain-Visualizer
# 🔗 Blockchain Visualizer

A simple and interactive blockchain simulation built using **React**, **TypeScript**, and **Tailwind CSS**. This project is intended to help students and developers understand the core concepts of blockchain technology by visualizing how blocks are created, added to a chain, and validated.

## 🧠 Features

- Create new blocks with custom data
- Visualize how each block links to the previous one
- See how hashes change when data is tampered
- Basic proof-of-work simulation (if implemented)
- Built entirely with modern frontend tools (Vite, React, Tailwind)

## 🚀 Live Demo

(Deploy it on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) and paste the link here)

## 📸 Screenshots

_Add screenshots of your UI here if possible_

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)




## 🧪 How It Works

- Each block contains:
  - Index
  - Timestamp
  - Custom data
  - Hash
  - Previous hash
- When a new block is added:
  - It's linked to the previous block using its hash
  - The hash is recalculated using block data
- You can tamper data and observe the hash inconsistency, simulating an invalid chain

## 📦 Installation
### Make sure you have these two files committed:
package.json
package-lock.json

Then, just run:
npm install

…to rebuild the node_modules folder locally.
```bash
# Clone the repo
git clone https://github.com/yourusername/blockchain-visualizer.git
cd blockchain-visualizer

# Install dependencies
npm install

# Run the development server
npm run dev
