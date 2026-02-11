/**
 * Redux Types - State, actions, and store configuration
 */

import type { Movie } from './movie.types';
import type { TVShow } from './tv.types';
import type { UserState } from './auth.types';

// My List item (can be movie or TV show)
export type MyListItem = (Movie | TVShow) & {
  addedAt?: string;
  media_type?: 'movie' | 'tv';
};

// My List state
export type MyListState = MyListItem[];

// Root state
export interface RootState {
  myList: MyListState;
  user: UserState;
}

// Action payloads
export interface AddToListPayload {
  item: MyListItem;
}

export interface RemoveFromListPayload {
  id: number;
}

export interface SetUserPayload {
  displayName?: string | null;
  name?: string | null;
  email: string | null;
  photoURL?: string | null;
  image?: string | null;
}

// Redux action types (for reference)
export type MyListActionType = 
  | 'myList/addToList'
  | 'myList/removeFromList'
  | 'myList/clearList';

export type UserActionType = 
  | 'user/setUser'
  | 'user/clearUser';
