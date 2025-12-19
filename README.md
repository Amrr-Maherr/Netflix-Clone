# Netflix Clone 🕸️

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-0AC775)](https://greensock.com/gsap/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000)](https://vercel.com/)

**A Frontend Netflix Clone** built with cutting-edge web technologies. This comprehensive project replicates Netflix's streaming UI with modern frontend architecture, featuring responsive design, PWA capabilities, advanced content discovery, detailed metadata pages, complex filtering, smooth animations, user authentication, and personalized watchlists.

**Key Highlights**:
- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Performance**: Server-side rendering, optimized images, lazy loading
- **UX Excellence**: GSAP animations, responsive design, accessibility-compliant
- **Full Features**: Search, filters, user accounts, offline PWA support
- **API Integration**: TMDB API with 12+ endpoints for movies, TV shows, people
- **State Management**: Hybrid approach with React Query + Redux Toolkit

![Netflix Clone Preview](./public/preview.gif)

> ⚠️ **Educational Purpose**: This project is built for learning and demonstration. It's not affiliated with Netflix and doesn't host actual video content.

## 📸 Screenshots

### Home Page
![Home Page](./public/screenshots/home-page.png)

### Movies Page
![Movies Page](./public/screenshots/movies-page.png)

### Movie Details
![Movie Details](./public/screenshots/movie-details.png)

### Mobile Responsive
![Mobile View](./public/screenshots/mobile-responsive.png)

> 🔄 *Screenshots are placeholders. Add your actual screenshots to `/public/screenshots/`*

## 🚀 Features

### Core & Design Features
- **Fully Responsive Design**: Optimized UI that adapts seamlessly across desktop, tablet, tablet, and mobile devices using Tailwind CSS breakpoints
- **Netflix-Inspired Dark Theme**: Dark mode interface with red accent colors matching Netflix branding for immersive video viewing experience
- **Progressive Web App (PWA) Support**: Installable on desktop and mobile, with offline capabilities including caching, service workers, and app-like behavior
- **Smooth Animations**: GSAP-powered animations including fade transitions, scroll-triggered reveals, text splitting, and rotating text effects
- **Modern UI Components**: Built using Radix UI primitives for accessible, customizable dialog, drawer, buttons, and select components

### Page Structure & Navigation
- **Dynamic Header/Navigation**: Responsive header with logo, navigation links, search trigger, user profile, and adaptive mobile menu
- **Footer**: Comprehensive footer with links, social media, and brand information
- **Scroll-to-Top Button**: Smooth scroll button with GSAP animations for improved navigation

### Home Page Features
- **Hero Section Slider**: Interactive swiper with autoplay, fade effects, and backdrop images (mobile-optimized with posters)
- **BentoGrid Layouts**: Unique bentocard grids for featured content with hover effects and image overlays
- **Banner Sections**: Alternating banner layouts showcasing individual movies or TV shows with call-to-action buttons
- **Multiple Content Sections**: Organized sections for trending, popular, coming soon, now playing, and airing content

### Content Browsing & Discovery
- **Movies Page**: Dedicated page for browsing movies with advanced filtering capabilities:
  - Genre filtering (Action, Comedy, Drama, etc.)
  - Year range filtering (1920-2025)
  - Rating filtering (IMDb ratings)
  - Language selection
  - Sorting by popularity, rating, revenue, or release date
  - Pagination with clean load-more functionality
- **TV Shows Page**: Similar advanced filtering and browsing for TV series with air date and episode count filtering
- **Kids Page**: Age-appropriate content section with PG-rated movies and shows
- **New & Popular Page**: Combined trending content from both movies and TV shows in grid layout

### Detailed Content Pages
- **Movie Details**: Comprehensive movie information including:
  - High-quality poster and backdrop images
  - Plot overview and runtime
  - Genres, release date, and production countries
  - Cast with clickable actor profiles
  - Crew information with department categorization
  - Production studios and languages
  - Ratings and vote counts
  - Trailers and videos section
  - Similar movies recommendations
  - "Add to My List" functionality
- **TV Show Details**: In-depth TV series information including:
  - Seasons overview with expandable accordion
  - Episode details with individual episode pages
  - Created by credits and networks
  - Keywords and content ratings
  - Cast and crew sections
  - Similar shows recommendations
- **Season Details**: Detailed view of individual seasons with episode list, aired dates, and episode counts
- **Actor/Crew Details**: Profile pages for cast and crew members including:
  - Biography and personal information
  - Known for section with filmography
  - Awards and trivia sections
  - Images gallery
  - Social media links
  - Movie/TV credits with department breakdown
  - Alternative names (also known as)

### Search & Discovery
- **Global Search**: Advanced search dialog with:
  - Real-time autocomplete suggestions
  - Search across movies, TV shows, and people
  - Results categorized by type
  - Filterable search results
- **Multi-Search API**: Integration with TMDb multi-search endpoint for comprehensive content discovery

### User Features & Authentication
- **Firebase Authentication**: Complete authentication system with:
  - Email/password registration and login
  - Password reset via email
  - Secure logout functionality
  - Real-time authentication state management
  - User profile data display (UID, provider, creation date, last sign-in, email verification)
- **User Account Page**: Enhanced profile management with:
  - Firebase user data visualization
  - Responsive design for mobile and desktop
  - Modern UI with gradients and animations
  - Direct logout functionality
- **Watchlist (My List)**: Personal watchlist for movies and TV shows:
  - Add/remove items with Redux state management
  - Persistent storage across sessions
  - Visual indicators and notifications

### Technical Excellence
- **State Management**: Hybrid approach using:
  - React Query (TanStack) for server state and API data caching
  - Redux Toolkit for client-side state (user data, watchlist)
- **API Integration**: Comprehensive TMDb API integration with:
  - Multiple endpoints (movies, TV, search, person details)
  - Proper error handling and loading states
  - Stale-while-revalidate caching
- **Performance Optimizations**: Next.js optimizations including:
  - Image optimization with Next.js Image component
  - Server-side rendering (SSR) for dynamic pages
  - Code splitting and lazy loading
  - Bundle analysis and optimization
- **SEO & Meta Management**: Dynamic meta tags, OpenGraph, and TwitterCard support for social sharing
- **Error Handling**: Comprehensive error boundaries and retry mechanisms with user-friendly messages

### User Experience Enhancements
- **Loading States**: Multiple skeleton loaders and spinner animations:
  - Netflix-style intro loader
  - Card skeleton lists for content grids
  - Loading overlays for actions
- **Interactive Elements**: Hover effects, click animations, and micro-interactions
- **Accessibility**: ARIA-compliant components and keyboard navigation support
- **Offline Support**: Cache invalidation and offline-first data fetching
- **Toast Notifications**: React Hot Toast for success/error feedback

### Additional Features
- **Pagination**: Efficient pagination for long content lists with smooth loading
- **Pricing Section**: SaaS-style pricing tiers for potential monetization
- **FAQ Section**: Expandable FAQ with smooth animations
- **Language Support**: Foundation for internationalization with prepared locales folder
- **Contact Information**: Professional contact and support information

## 🛠️ Tech Stack & Dependencies

### Core Framework & Runtime
- **Next.js 16**: React framework with App Router for routing, SSR/SSG, and optimized performance
- **React 19**: Latest React with concurrent features and optimized rendering
- **TypeScript**: Full type safety, interfaces for API responses, and enhanced developer experience

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework for responsive, dark-themed UI with custom animations
- **Radix UI**: Accessible component primitives (Dialog, Drawer, Select, Button, Input)
- **Lucide React**: Modern icon library for consistent UI icons

### Animations & Interactions
- **GSAP**: GreenSock Animation Platform for complex animations, scroll triggers, and text effects
- **Framer Motion**: Additional animation library for micro-interactions (used in RotatedText, BentoCard)
- **Swiper**: Touch-enabled swiper/carousel with autoplay and effect support

### State Management & Data Fetching
- **TanStack React Query (v5)**: Powerful data synchronization, caching, and background refetching for API calls
- **Redux Toolkit**: Global state management for user authentication and watchlist data
- **Zustand**: Lightweight state management for simple state needs (alternative to Redux)

### Authentication & Session
- **Firebase Authentication**: Real-time authentication with email/password, social providers, and session management

### HTTP & API Integration
- **Axios**: HTTP client for API requests with interceptors and error handling
- **TMDb API**: The Movie Database API integration for movie/TV/person data
- **Firebase SDK**: Firebase services integration for authentication and user management

### Forms & Validation
- **React Hook Form**: Performant forms with validation and error handling
- **Zod**: Runtime type validation (optional, can be integrated for form validation)

### Progressive Web App
- **next-pwa**: PWA plugin providing service workers, manifest, and offline capabilities

### Additional Utilities
- **clsx**: Utility for constructing conditional CSS classes
- **tailwind-merge**: Merge Tailwind classes without conflicts
- **class-variance-authority**: Create variant-based component styles
- **vaul**: Customizable drawer component for mobile navigation

### Development & Build Tools
- **ESLint**: Code linting and quality enforcement
- **PostCSS**: CSS processing with Tailwind plugins
- **TypeScript**: Compiler for type checking

### Deployment & Hosting
- **Vercel**: Optimized deployment platform for Next.js applications with automatic scaling

## 🔄 Development Highlights

### Architecture & Code Quality
- **App Router Design**: Leveraging Next.js 16 App Router for file-based routing with nested layouts and server components
- **TypeScript Integration**: Comprehensive type safety with custom interfaces for TMDB API responses, preventing runtime errors
- **Clean Code Practices**: Separation of concerns with API layers, component composition, and reusable utilities
- **Performance Monitoring**: React Query DevTools for API state inspection and optimization

### User Experience Focus
- **Accessibility First**: ARIA labels, keyboard navigation, and screen reader compatibility
- **Mobile-First Responsive**: Tailwind CSS breakpoints ensuring perfect mobile experience
- **Micro-Interactions**: Subtle animations enhancing user engagement without performance impact
- **Error Resilience**: Graceful degradation with fallback UI and user-friendly error messages

### Technical Implementation
- **Hybrid State Strategy**: React Query for async data + Redux for persistent UI state
- **Optimized Bundling**: Code splitting, tree shaking, and efficient module imports
- **SEO Optimization**: Dynamic meta tags, structured data, and social sharing capabilities
- **PWA Capabilities**: Service workers, caching strategies, and installable app features

### Features Showcase
- **Real-time Search**: Instant autocomplete with debounced API calls and cached results
- **Advanced Filtering**: Multi-criteria filtering with URL state synchronization
- **Personalized Content**: User watchlists with local storage persistence
- **Rich Media Support**: Video trailers, image galleries, and responsive media components

## 📈 Frontend Development Skills Demonstrated

This project showcases proficiency in:
- **React & Next.js**: App Router, server components, SSR/SSG, routing, and middleware
- **Modern React Ecosystem**: Hooks, concurrent rendering, portals, and context patterns
- **Frontend Architecture**: Component composition, custom hooks, and clean separation of concerns
- **TypeScript Integration**: Advanced typing, generic components, and API response interfaces
- **Performance Optimization**: Lazy loading, code splitting, image optimization, and bundle analysis
- **User Experience Design**: Responsive layouts, CSS animations, accessibility (WCAG compliant)
- **State Management**: Complex data flows with clientside caching and persistent state
- **API Integration**: RESTful client patterns, error handling, and offline-first strategies
- **UI/UX Excellence**: Dark theme design, micro-interactions, and cross-device compatibility
- **Build Tools**: Modern bundling, linting, testing foundation, and deployment automation

Perfect addition to a CV demonstrating advanced frontend development with modern web technologies!

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Amrr-Maherr/Netflix-Clone.git
cd Netflix-Clone
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your API credentials:
```env
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_access_token

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## � Demo

Check out the live demo: [Netflix Clone Live](https://netflix-clone-demo.vercel.app/) *(placeholder link)*

Or visit the deployed version at Vercel after deployment.

## �🏗️ Project Structure

```
netflix-clone/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Authentication pages
│   ├── Account/                # User account pages
│   ├── ActorDetails/           # Actor profile pages
│   ├── CrewDetails/            # Crew profile pages
│   ├── Kids/                   # Kids content page
│   ├── MovieDetails/           # Movie detail pages
│   ├── Movies/                 # Movies browsing page
│   ├── NewPopular/             # Trending content page
│   ├── TvShowDetails/          # TV show detail pages
│   ├── TvShows/                # TV shows browsing page
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
├── components/                 # Shared components
│   ├── ui/                     # UI components (buttons, inputs, etc.)
│   └── ...                     # Feature-specific components
├── lib/                        # Utility functions
├── public/                     # Static assets
│   ├── icons/                  # PWA icons
│   ├── local/                  # Localized static files
│   └── ...                     # Images and media
├── Api/                        # API functions and services
├── Store/                      # State management (Redux)
├── Types/                      # TypeScript type definitions
└── locales/                    # Internationalization files
```

## 🎯 Key Components

- **HeroSection**: Animated content slider for homepage
- **CardMovie/CardTvShow**: Content cards with hover effects
- **Filters**: Advanced filtering system for movies/TV shows
- **SearchComponent**: Global search with suggestions
- **PaginationButtons**: Load more pagination
- **Loading/Skeleton**: Loading states and placeholders

## 📱 PWA Features

- **Offline Support**: Cache content for offline viewing
- **Install Prompt**: Automatic installation prompts
- **App-like Experience**: Standalone app mode
- **Fast Loading**: Instant loading of cached content

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## 🚀 Deployment

Deploy automatically to Vercel by pushing to the main branch, or manually:

```bash
npm run build
npm run start
```

## 🎨 Customization

The project uses Tailwind CSS classes for styling. You can customize:
- Colors in `tailwind.config.js`
- Typography in `app/globals.css`
- Animations in component files

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Please respect copyright laws and TMDb terms of service.

## 🙏 Acknowledgments

- [TMDb API](https://www.themoviedb.org/) for content data
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Netflix for UI inspiration

## 📞 Support

For questions or issues, please open a GitHub issue or contact the maintainers.
