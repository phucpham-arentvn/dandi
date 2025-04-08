# Technical Context

## Technology Stack

1. Core Technologies

   - Next.js 15.2.4
   - React 19.0.0
   - TypeScript 5.x
   - Node.js (Latest LTS)

2. UI Technologies

   - TailwindCSS 4.x
   - PostCSS
   - Modern CSS features

3. Development Tools
   - ESLint 9.x
   - Next.js ESLint config
   - TypeScript ESLint
   - Turbopack (dev mode)

## Development Setup

1. Environment Requirements

   ```bash
   Node.js: Latest LTS
   npm/yarn/pnpm: Latest stable
   ```

2. Project Setup

   ```bash
   # Install dependencies
   yarn install

   # Development server
   yarn dev

   # Production build
   yarn build

   # Start production server
   yarn start

   # Linting
   yarn lint
   ```

3. IDE Configuration
   - VSCode recommended
   - TypeScript support
   - ESLint integration
   - Tailwind CSS IntelliSense

## Dependencies

1. Production Dependencies

   ```json
   {
     "react": "^19.0.0",
     "react-dom": "^19.0.0",
     "next": "15.2.4"
   }
   ```

2. Development Dependencies
   ```json
   {
     "typescript": "^5",
     "@types/node": "^20",
     "@types/react": "^19",
     "@types/react-dom": "^19",
     "@tailwindcss/postcss": "^4",
     "tailwindcss": "^4",
     "eslint": "^9",
     "eslint-config-next": "15.2.4",
     "@eslint/eslintrc": "^3"
   }
   ```

## Configuration Files

1. TypeScript Config (tsconfig.json)

   - Strict mode enabled
   - Next.js specific settings
   - Modern JavaScript features

2. ESLint Config (eslint.config.mjs)

   - Next.js rules
   - TypeScript rules
   - Custom rules

3. Next.js Config (next.config.ts)

   - TypeScript configuration
   - Build optimizations
   - Environment settings

4. PostCSS Config (postcss.config.mjs)
   - TailwindCSS integration
   - Modern CSS features
   - Optimization plugins

## Development Workflow

1. Code Style

   - ESLint for code quality
   - TypeScript for type safety
   - Prettier for formatting (planned)

2. Build Process

   - Development: Turbopack
   - Production: Next.js build
   - Type checking
   - Linting

3. Deployment
   - Vercel deployment ready
   - Environment variables
   - Build optimization
   - Cache management

## Technical Constraints

1. Browser Support

   - Modern browsers
   - ES6+ features
   - CSS Grid/Flexbox
   - Web APIs

2. Performance Targets

   - Core Web Vitals
   - Bundle size limits
   - Load time targets
   - Memory usage

3. Security Requirements
   - HTTPS only
   - Content Security Policy
   - XSS prevention
   - CSRF protection
