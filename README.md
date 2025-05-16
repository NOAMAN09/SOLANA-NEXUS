# Solana  Dashboard

A modern web application for interacting with the Solana blockchain. This dashboard provides a user-friendly interface for managing Solana tokens, viewing NFTs, and performing transactions.

Developed by Noaman Khan.

## Features

- **Wallet Integration**: Connect with popular Solana wallets
- **Token Management**: View and transfer SOL and SPL tokens
- **NFT Gallery**: Display your Solana NFT collection
- **Portfolio Overview**: Track your Solana assets in one place
- **Responsive Design**: Works on desktop and mobile devices

## Technologies

This project is built with modern web technologies:

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable UI components
- **Solana Web3.js**: Solana blockchain interaction
- **Zustand**: State management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/solana-demo.git
   cd solana-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

You can deploy this application to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS Amplify
- Firebase Hosting

## Project Structure

```
solana-demo/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Application pages
│   ├── store/           # State management
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .gitignore           # Git ignore file
├── index.html           # HTML entry point
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Solana Foundation for their excellent documentation
- The React and Vite communities for their tools and support
- All contributors who have helped improve this project
- Special thanks to Noaman Khan for developing and maintaining this project
