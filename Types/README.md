# TypeScript Type System Architecture

## Overview

This directory contains a comprehensive, production-ready TypeScript type system for the Netflix Clone application. All types are strictly typed with no `any` usage, following best practices for large-scale Next.js applications.

## Architecture Principles

### 1. Domain Separation
Types are organized by domain/entity:
- `base.types.ts` - Shared base interfaces and common types
- `movie.types.ts` - Movie-specific types
- `tv.types.ts` - TV show-specific types
- `person.types.ts` - Actor/crew/person types
- `search.types.ts` - Multi-search with discriminated unions
- `auth.types.ts` - Firebase authentication
- `redux.types.ts` - Redux state management
- `api.types.ts` - API request/response wrappers
- `react-query.types.ts` - React Query configuration

### 2. Type Reusability
- `BaseMedia` interface shared by Movie and TVShow
- Common fields extracted to avoid duplication
- Discriminated unions for polymorphic data (search results)

### 3. Strict Typing
- No `any` types used
- All nullable fields explicitly typed with `| null`
- Optional fields marked with `?`
- Enums for fixed value sets (MediaType, VideoType, etc.)

### 4. API Response Modeling
- `PaginatedResponse<T>` wrapper for list endpoints
- Detailed types for full detail endpoints with `append_to_response`
- Separate types for basic vs detailed entities

## Type Hierarchy

```
BaseMedia (shared fields)
├── Movie (basic movie from lists)
│   └── DetailedMovie (full movie details with appended data)
└── TVShow (basic TV show from lists)
    └── DetailedTVShow (full TV show details with appended data)

Person (basic person from lists)
└── DetailedPerson (full person details with credits)

SearchResult (discriminated union)
├── Movie & { media_type: 'movie' }
├── TVShow & { media_type: 'tv' }
└── Person & { media_type: 'person' }
```

## Usage Examples

### Importing Types

```typescript
// Import specific types
import type { Movie, DetailedMovie, TVShow } from '@/Types';

// Import everything
import type * from '@/Types';

// Import with type guards
import { isMovieResult, isTVResult, isPersonResult } from '@/Types';
```

### Using with React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import type { DetailedMovie } from '@/Types';
import { queryKeys } from '@/Types';

const { data: movie } = useQuery<DetailedMovie>({
  queryKey: queryKeys.movies.detail(id),
  queryFn: () => FetchMovieDetails({ id }),
});
```

### Using with Redux

```typescript
import { useSelector } from 'react-redux';
import type { RootState, MyListState } from '@/Types';

const myList = useSelector((state: RootState) => state.myList);
const user = useSelector((state: RootState) => state.user);
```

### Type Guards for Search Results

```typescript
import type { SearchResult } from '@/Types';

function handleSearchResult(result: SearchResult) {
  if (result.media_type === 'movie') {
    // TypeScript knows this is a Movie
    console.log(result.title);
  } else if (result.media_type === 'tv') {
    // TypeScript knows this is a TVShow
    console.log(result.name);
  } else {
    // TypeScript knows this is a Person
    console.log(result.name);
  }
}
```

### Working with Paginated Responses

```typescript
import type { PaginatedResponse, Movie } from '@/Types';

const response: PaginatedResponse<Movie> = await fetchPopularMovies();
console.log(response.results); // Movie[]
console.log(response.total_pages);
```

## File Descriptions

### Core Entity Types

- **base.types.ts** - Foundation types shared across entities (BaseMedia, Genre, ProductionCompany, etc.)
- **movie.types.ts** - Movie entity with basic and detailed variants
- **tv.types.ts** - TV show entity with seasons, episodes, and networks
- **person.types.ts** - Actor, crew member, and person details with credits

### Feature-Specific Types

- **search.types.ts** - Multi-search with discriminated unions for type-safe results
- **credits.types.ts** - Cast and crew information
- **video.types.ts** - Trailers, teasers, and video content
- **image.types.ts** - Posters, backdrops, and image galleries
- **review.types.ts** - User reviews and ratings
- **keyword.types.ts** - Movie/TV show keywords and tags
- **watch-providers.types.ts** - Streaming availability information
- **external-ids.types.ts** - IMDB, Facebook, Instagram, Twitter IDs

### Infrastructure Types

- **api.types.ts** - API request/response wrappers and error handling
- **react-query.types.ts** - React Query configuration and query keys
- **redux.types.ts** - Redux store state and action types
- **auth.types.ts** - Firebase authentication types

## Best Practices

### 1. Always Use Type Imports

```typescript
// ✅ Good - Type-only import
import type { Movie } from '@/Types';

// ❌ Avoid - Runtime import for types
import { Movie } from '@/Types';
```

### 2. Leverage Discriminated Unions

```typescript
// SearchResult automatically narrows based on media_type
function getTitle(result: SearchResult): string {
  return result.media_type === 'movie' ? result.title : result.name;
}
```

### 3. Use Utility Types

```typescript
// Pick specific fields
type MoviePreview = Pick<Movie, 'id' | 'title' | 'poster_path'>;

// Make all fields optional
type PartialMovie = Partial<Movie>;

// Make all fields required
type RequiredMovie = Required<Movie>;
```

### 4. Extend Types When Needed

```typescript
// Add custom fields to existing types
interface MovieWithCustomData extends Movie {
  isFavorite: boolean;
  watchedAt?: Date;
}
```

## Type Safety Guidelines

1. **Never use `any`** - Use `unknown` if type is truly unknown
2. **Explicit null handling** - Use `| null` for nullable fields
3. **Optional vs Nullable** - Use `?` for optional, `| null` for nullable
4. **Readonly when appropriate** - Use `readonly` for immutable data
5. **Const assertions** - Use `as const` for literal types

## Migration Guide

If you're adding new types or modifying existing ones:

1. **Check for breaking changes** - Ensure backward compatibility
2. **Update index.ts** - Export new types from the barrel file
3. **Document complex types** - Add JSDoc comments for clarity
4. **Test type inference** - Verify TypeScript correctly infers types
5. **Update this README** - Document new patterns or conventions

## Common Patterns

### Handling Optional API Fields

```typescript
// API might not return all fields
interface MovieDetails {
  id: number;
  title: string;
  budget?: number; // Optional - might not be present
  revenue: number | null; // Nullable - explicitly null in response
}
```

### Generic Components

```typescript
import type { Movie, TVShow } from '@/Types';

interface MediaCardProps<T extends Movie | TVShow> {
  item: T;
  onSelect: (item: T) => void;
}

function MediaCard<T extends Movie | TVShow>({ item, onSelect }: MediaCardProps<T>) {
  // Component implementation
}
```

### API Response Typing

```typescript
import type { PaginatedResponse, Movie, APIError } from '@/Types';

async function fetchMovies(): Promise<PaginatedResponse<Movie>> {
  try {
    const response = await fetch('/api/movies');
    return await response.json();
  } catch (error) {
    throw error as APIError;
  }
}
```

## Troubleshooting

### Type Errors

**Problem**: `Property 'title' does not exist on type 'SearchResult'`

**Solution**: Use type narrowing with discriminated unions

```typescript
if (result.media_type === 'movie') {
  console.log(result.title); // Now TypeScript knows it's a Movie
}
```

**Problem**: `Type 'null' is not assignable to type 'string'`

**Solution**: Handle null cases explicitly

```typescript
const title = movie.title ?? 'Unknown Title';
// or
if (movie.title !== null) {
  console.log(movie.title);
}
```

## Contributing

When adding new types:

1. Follow the existing naming conventions
2. Add JSDoc comments for complex types
3. Export from `index.ts`
4. Update this README with usage examples
5. Ensure no `any` types are introduced

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Last Updated**: February 2026  
**Maintained By**: Development Team