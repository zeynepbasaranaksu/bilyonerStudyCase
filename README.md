# 🏆 Sports Betting Web App

A modern, responsive sports betting web application built with React, TypeScript, Redux, and Firebase. This application allows users to browse sports events, view odds, add bets to their cart, and manage their betting experience.

## ✨ Features

### 🛠️ Technical Features
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: Efficient state management
- **React Router**: Client-side routing
- **ESLint & Prettier**: Code quality and formatting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sports-betting-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   VITE_BETTING_API_URL=https://api.the-odds-api.com/v4
   VITE_BETTING_API_KEY=your_betting_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── EventCard/      # Event display component
│   ├── SearchBar/      # Search functionality
│   ├── Header/         # Navigation header
│   ├── CartItem/       # Cart item display
│   ├── LoadingSpinner/ # Loading states
│   └── ErrorMessage/   # Error handling
├── pages/              # Main application pages
│   ├── BetBulletin/    # Events listing page
│   ├── BetBasket/      # Shopping cart page
│   └── Login/          # Authentication page
├── store/              # Redux store configuration
│   └── slices/         # Redux slices
├── services/           # API and external services
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── firebase/           # Firebase configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier


## 📄 License

This project is licensed under the MIT License.

---

