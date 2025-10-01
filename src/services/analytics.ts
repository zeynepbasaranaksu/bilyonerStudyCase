import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase/config';
import type { BetEvent, CartItem } from '../types';

export const analyticsService = {
  logMatchDetailEvent: (event: BetEvent) => {
    if (analytics) {
      logEvent(analytics, 'match_detail_viewed', {
        event_id: event.id,
        sport: event.sport_title,
        home_team: event.home_team,
        away_team: event.away_team,
        commence_time: event.commence_time,
      });
    } else {
      console.log('Analytics: Match detail viewed', {
        event_id: event.id,
        sport: event.sport_title,
        home_team: event.home_team,
        away_team: event.away_team,
      });
    }
  },

  logAddToCartEvent: (cartItem: CartItem) => {
    if (analytics) {
      logEvent(analytics, 'add_to_cart', {
        event_id: cartItem.event.id,
        sport: cartItem.event.sport_title,
        home_team: cartItem.event.home_team,
        away_team: cartItem.event.away_team,
        outcome_name: cartItem.outcome.name,
        outcome_price: cartItem.outcome.price,
        bookmaker: cartItem.bookmaker.title,
        market_type: cartItem.market.key,
      });
    } else {
      console.log('Analytics: Add to cart', {
        event_id: cartItem.event.id,
        sport: cartItem.event.sport_title,
        outcome_name: cartItem.outcome.name,
        outcome_price: cartItem.outcome.price,
      });
    }
  },

  logRemoveFromCartEvent: (cartItem: CartItem) => {
    if (analytics) {
      logEvent(analytics, 'remove_from_cart', {
        event_id: cartItem.event.id,
        sport: cartItem.event.sport_title,
        home_team: cartItem.event.home_team,
        away_team: cartItem.event.away_team,
        outcome_name: cartItem.outcome.name,
        outcome_price: cartItem.outcome.price,
        bookmaker: cartItem.bookmaker.title,
        market_type: cartItem.market.key,
      });
    } else {
      console.log('Analytics: Remove from cart', {
        event_id: cartItem.event.id,
        sport: cartItem.event.sport_title,
        outcome_name: cartItem.outcome.name,
      });
    }
  },

  logUserLogin: (userId: string) => {
    if (analytics) {
      logEvent(analytics, 'login', {
        user_id: userId,
      });
    } else {
      console.log('Analytics: User login', { user_id: userId });
    }
  },

  logUserLogout: (userId: string) => {
    if (analytics) {
      logEvent(analytics, 'logout', {
        user_id: userId,
      });
    } else {
      console.log('Analytics: User logout', { user_id: userId });
    }
  },
};
