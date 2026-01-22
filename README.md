# Netflix Clone

A modern, responsive Netflix-inspired streaming platform built with Next.js 16, featuring TMDB API integration, Firebase authentication, and advanced UI/UX patterns.

## 🎬 Project Overview

This Netflix Clone is a comprehensive streaming platform that replicates the core functionality of Netflix. It features a sleek, responsive interface with dynamic content loading, search capabilities, user authentication, and personalized watchlists. The application leverages the TMDB API to provide access to thousands of movies and TV shows with detailed information.

## ✨ Key Features

### 📺 Content Discovery
- **Trending Movies & TV Shows**: Discover the most popular content across different time periods (daily, weekly)
- **Category Sections**: Browse content organized by popularity, ratings, upcoming releases, and currently airing
- **Detailed Content Pages**: Comprehensive information for each movie/TV show including cast, crew, trailers, reviews, and similar content
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### 🔍 Advanced Search & Filtering
- **Multi-search Functionality**: Search across movies, TV shows, and people simultaneously
- **Real-time Results**: Instant search suggestions as you type
- **Filtering Options**: Discover content based on genre, release date, and other criteria

### 👤 User Authentication & Personalization
- **Firebase Authentication**: Secure login/register functionality with email/password
- **Personalized Watchlist**: Add/remove content to your personal "My List" (persisted with Redux)
- **User Profiles**: Manage account settings and preferences
- **Password Reset**: Built-in password recovery functionality

### 🎨 Rich UI/UX Experience
- **Animated Hero Carousel**: Dynamic slideshow showcasing featured content with smooth transitions
- **Interactive Cards**: Hover effects with quick action buttons (play, add to list, more info)
- **Smooth Animations**: GSAP-powered scroll-triggered animations for engaging user experience
- **Dark Theme**: Netflix-style dark interface optimized for viewing content

### 📱 Progressive Web App (PWA)
- **Offline Support**: Application works offline with cached content
- **Installable**: Install as a standalone application on mobile and desktop
- **Push Notifications**: Ready for future notification implementations

### 🔄 Real-time Data Management
- **React Query Integration**: Efficient data fetching with caching, deduplication, and background updates
- **Redux Toolkit**: Centralized state management for user preferences and watchlist
- **Optimistic Updates**: Smooth UI interactions with immediate feedback

## 🛠️ Technologies & Libraries Used

### Core Framework
- **Next.js 16**: Modern React framework with App Router, Server Components, and enhanced performance
- **React 19**: Latest version of the popular UI library

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI Primitives**: Accessible, customizable UI components
- **Lucide React**: Beautiful, consistent icon library
- **Swiper**: Touch slider library for carousels and sliders

### State Management & Data
- **Redux Toolkit**: Predictable state container with simplified configuration
- **React Query (TanStack)**: Server state management with powerful caching capabilities
- **React Hook Form**: Performant, flexible forms with easy validation

### Animation & Interactions
- **GSAP**: Professional-grade animation library for complex animations
- **Framer Motion**: Production-ready motion library for React

### External Integrations
- **TMDB API**: Extensive movie and TV show database
- **Firebase**: Authentication, real-time database, and cloud services

### Utilities
- **Axios**: Promise-based HTTP client for API requests
- **React Hot Toast**: Elegant toast notifications
- **Class Variance Authority**: Utility for managing component variants
- **Next-PWA**: Progressive Web App functionality

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_access_token
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   - Create `.env.local` file with your TMDB API key and Firebase configuration

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application

## 📋 Usage Instructions

### Browsing Content
- Navigate through different sections: Trending, Popular, Top Rated, Upcoming, etc.
- Click on any movie/TV show card to view detailed information
- Use the search functionality to find specific content

### User Authentication
- Click "Sign In" in the header to access the login page
- Register for a new account or log in with existing credentials
- Access your account settings from the user profile menu

### Managing Your List
- Click the "+" button on any movie/TV show card to add it to your watchlist
- Access your watchlist from the "My List" navigation item
- Remove items by clicking the "-" button on the card

### Responsive Behavior
- The application adapts to different screen sizes automatically
- On mobile devices, use the hamburger menu for navigation
- Swipe gestures are supported for carousel navigation

## 🔌 API Integration Details

### TMDB API Endpoints Used
- `/trending/movie/week` - Weekly trending movies
- `/trending/movie/day` - Daily trending movies
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top-rated movies
- `/movie/upcoming` - Upcoming movies
- `/movie/now_playing` - Currently playing movies
- `/trending/tv/week` - Weekly trending TV shows
- `/trending/tv/day` - Daily trending TV shows
- `/tv/popular` - Popular TV shows
- `/tv/top_rated` - Top-rated TV shows
- `/tv/airing_today` - TV shows airing today
- `/tv/on_the_air` - TV shows currently on air
- `/search/multi` - Multi-search across movies, TV shows, and people
- `/movie/{id}` - Detailed movie information
- `/tv/{id}` - Detailed TV show information

### API Response Handling
- All API requests are handled with proper error handling
- Loading states are displayed during data fetching
- Retry mechanisms are implemented for failed requests
- Caching strategies are used to optimize performance

## 🎨 Design Patterns & Best Practices

### Component Architecture
- **Atomic Design**: Components are organized in a hierarchical structure
- **Container/Presentational Pattern**: Separation of data-fetching and UI-rendering components
- **Compound Components**: Complex UI elements with multiple interconnected parts

### State Management Strategy
- **Local State**: For component-specific state using React hooks
- **Global State**: For application-wide state using Redux Toolkit
- **Server State**: For API data using React Query

### Performance Optimization
- **Code Splitting**: Dynamic imports for improved initial load times
- **Image Optimization**: Next.js Image component with proper sizing and lazy loading
- **Caching Strategies**: React Query caching and browser caching
- **Bundle Analysis**: Optimized bundle sizes with tree shaking

### Accessibility Features
- **Semantic HTML**: Proper use of HTML elements for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **ARIA Attributes**: Proper labeling and roles for interactive elements
- **Focus Management**: Clear focus indicators and logical tab order

## 🧪 Testing & Quality Assurance

The application follows modern testing practices:
- Component testing with React Testing Library
- Integration testing for API interactions
- Accessibility testing for inclusive design
- Performance monitoring and optimization

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new functionality
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Special thanks to TMDB for providing the extensive movie and TV show database
- Inspired by the Netflix user experience and interface design
- Built with the amazing Next.js ecosystem and open-source community

---

<div align="center">

**Built with ❤️ using Next.js**

</div>