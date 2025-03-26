# Viva La Lingo Website

Modern website for the Viva La Lingo language learning app based on the Birkenbihl method.

## Technology Stack

- **React**: UI library for building component-based interfaces
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Fast, modern build tool with hot module replacement
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **GSAP**: Professional-grade animation library
- **Framer Motion**: React animation library for smooth transitions
- **React Router**: Routing solution for React applications

## Project Setup

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Viva La Lingo-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The site will be accessible at http://localhost:5173

## Build for Production

To build the project for production:

```bash
npm run build
```

This will generate optimized files in the `dist` directory.

## Project Structure

```
Viva La Lingo-website/
├── public/             # Static assets
│   └── images/         # Images and media files
├── src/                # Source code
│   ├── assets/         # Local assets
│   ├── components/     # React components
│   │   ├── home/       # Homepage-specific components
│   │   ├── layout/     # Layout components (Header, Footer, etc.)
│   │   ├── method/     # Method page components
│   │   └── shared/     # Shared/reusable components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component with routes
│   └── main.tsx        # Entry point
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tailwind.config.js  # TailwindCSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Key Features

- Interactive word flow animation
- Animated method demonstration
- Interactive budget comparison sliders
- Animated discount code section
- Responsive design for all devices
- Modern animation effects