export interface BetEvent {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface Market {
  key: string;
  last_update: string;
  outcomes: Outcome[];
}

export interface Outcome {
  name: string;
  price: number;
  point?: number;
}

export interface CartItem {
  event: BetEvent;
  market: Market;
  outcome: Outcome;
  bookmaker: Bookmaker;
  id: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}


export interface EventsState {
  events: BetEvent[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalEvents: number;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
