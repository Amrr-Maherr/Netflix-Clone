# Netflix Clone 🕸️

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-0AC775)](https://greensock.com/gsap/)

A comprehensive Netflix-style streaming platform clone built with modern web technologies. This project replicates the core features and user experience of Netflix, including responsive design, PWA support, content browsing, detailed pages, and advanced filtering.

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

### Core Functionality
- **Responsive Design**: Fully responsive design that works seamlessly across desktop, tablet, and mobile devices
- **Progressive Web App (PWA)**: Installable on desktop and mobile devices with offline capabilities
- **Dark Theme**: Netflix-style dark theme optimized for video content viewing

### Content Pages
- **Home Page**: Dynamic hero section with trending content slider
- **Movies Page**: Browse and filter movies with advanced filtering options
  - Genre filters
  - Year filters
  - Rating filters
  - Language options
  - Sort by popularity, rating, or release date
- **TV Shows Page**: Similar filtering and browsing for TV series
- **Kids Page**: Family-friendly content with age-appropriate films
- **New & Popular**: Combined trending movies and TV shows with interactive grid

### Advanced Features
- **Hero Sections**: Animated sliders featuring top movies/TV shows on multiple pages
- **Content Details**: Detailed information pages for movies and TV shows
  - Cast and crew information
  - User ratings and reviews
  - Trailers and videos
  - Similar content recommendations
- **Search Functionality**: Global search with autocomplete suggestions
- **Watchlist**: Create and manage personal watchlist (requires authentication)
- **Content Filtering**: Multiple filter options for personalized content discovery

### Technical Features
- **Next.js 15**: Latest Next.js with App Router
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP Animations**: Smooth animations and transitions
- **API Integration**: Seamless integration with TMDb API for content data
- **State Management**: React Query for server state management
- **PWA Support**: Service workers and manifest for app-like experience
- **SEO Optimized**: Server-side rendering and meta tag management

### User Experience
- **Loading States**: Beautiful loading animations and skeletons
- **Error Handling**: Comprehensive error boundaries and retry mechanisms
- **Smooth Scrolling**: GSAP-powered smooth scroll animations
- **Image Optimization**: Next.js image optimization for fast loading
- **Lazy Loading**: Components and images load on demand

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **State Management**: React Query (TanStack Query)
- **API**: TMDb API
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Forms**: Native HTML & React Hook Form

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

4. Add your TMDb API credentials:
```env
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_access_token
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
