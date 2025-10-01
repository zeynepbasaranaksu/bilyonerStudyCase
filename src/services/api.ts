import axios from 'axios';
import type { BetEvent } from '../types';

const API_BASE_URL = import.meta.env.VITE_BETTING_API_URL || 'https://api.the-odds-api.com/v4';
const API_KEY = import.meta.env.VITE_BETTING_API_KEY || 'demo';

// Check if we have a valid API key
const hasValidApiKey = API_KEY && API_KEY !== 'demo';

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

// Mock data 
const generateMockEvents = (sport: string): BetEvent[] => {
  const sports = {
    soccer: {
      title: 'Soccer',
      teams: [
        ['Manchester United', 'Liverpool'],
        ['Barcelona', 'Real Madrid'],
        ['Bayern Munich', 'Borussia Dortmund'],
        ['PSG', 'Marseille'],
        ['Chelsea', 'Arsenal'],
        ['AC Milan', 'Inter Milan'],
      ]
    },
    basketball: {
      title: 'Basketball',
      teams: [
        ['Lakers', 'Warriors'],
        ['Celtics', 'Heat'],
        ['Bulls', 'Knicks'],
        ['Nets', '76ers'],
        ['Suns', 'Clippers'],
        ['Bucks', 'Nuggets'],
      ]
    },
    americanfootball: {
      title: 'American Football',
      teams: [
        ['Patriots', 'Bills'],
        ['Chiefs', 'Dolphins'],
        ['Cowboys', 'Eagles'],
        ['Packers', 'Vikings'],
        ['Rams', '49ers'],
        ['Steelers', 'Ravens'],
      ]
    },
    tennis: {
      title: 'Tennis',
      teams: [
        ['Djokovic', 'Nadal'],
        ['Federer', 'Murray'],
        ['Medvedev', 'Zverev'],
        ['Tsitsipas', 'Rublev'],
        ['Sinner', 'Alcaraz'],
        ['Ruud', 'Norrie'],
      ]
    },
    hockey: {
      title: 'Hockey',
      teams: [
        ['Maple Leafs', 'Bruins'],
        ['Rangers', 'Islanders'],
        ['Penguins', 'Capitals'],
        ['Avalanche', 'Golden Knights'],
        ['Lightning', 'Panthers'],
        ['Oilers', 'Flames'],
      ]
    }
  };

  const sportData = sports[sport as keyof typeof sports] || sports.soccer;
  
  return sportData.teams.map(([home, away], index) => ({
    id: `${sport}_${index + 1}`,
    sport_key: sport,
    sport_title: sportData.title,
    commence_time: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString(),
    home_team: home,
    away_team: away,
    bookmakers: [
      {
        key: 'bet365',
        title: 'Bet365',
        last_update: new Date().toISOString(),
        markets: [
          {
            key: 'h2h',
            last_update: new Date().toISOString(),
            outcomes: [
              { name: home, price: Math.floor(Math.random() * 200) + 100 },
              { name: away, price: Math.floor(Math.random() * 200) + 100 },
            ]
          }
        ]
      },
      {
        key: 'draftkings',
        title: 'DraftKings',
        last_update: new Date().toISOString(),
        markets: [
          {
            key: 'h2h',
            last_update: new Date().toISOString(),
            outcomes: [
              { name: home, price: Math.floor(Math.random() * 200) + 100 },
              { name: away, price: Math.floor(Math.random() * 200) + 100 },
            ]
          }
        ]
      }
    ]
  }));
};

export const bettingAPI = {
  getEvents: async (sport: string = 'soccer'): Promise<BetEvent[]> => {
    if (!hasValidApiKey) {
      console.log('Using mock data');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateMockEvents(sport);
    }

    try {
      const response = await api.get(`/sports/${sport}/odds/`, {
        params: {
          regions: 'us',
          markets: 'h2h,spreads,totals',
          oddsFormat: 'american',
          dateFormat: 'iso',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      console.log('Falling back to mock data');
      return generateMockEvents(sport);
    }
  },

  searchEvents: async (sport: string, query: string): Promise<BetEvent[]> => {
    if (!hasValidApiKey) {
      console.log('Using mock data for search');
      await new Promise(resolve => setTimeout(resolve, 500));
      const events = generateMockEvents(sport);
      if (!query.trim()) return events;
      
      return events.filter((event: BetEvent) =>
        event.home_team.toLowerCase().includes(query.toLowerCase()) ||
        event.away_team.toLowerCase().includes(query.toLowerCase()) ||
        event.sport_title.toLowerCase().includes(query.toLowerCase())
      );
    }

    try {
      const response = await api.get(`/sports/${sport}/odds/`, {
        params: {
          regions: 'us',
          markets: 'h2h,spreads,totals',
          oddsFormat: 'american',
          dateFormat: 'iso',
        },
      });
      
      const events = response.data;
      if (!query.trim()) return events;
      
      return events.filter((event: BetEvent) =>
        event.home_team.toLowerCase().includes(query.toLowerCase()) ||
        event.away_team.toLowerCase().includes(query.toLowerCase()) ||
        event.sport_title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching events:', error);
      console.log('Falling back to mock data');
      const events = generateMockEvents(sport);
      if (!query.trim()) return events;
      
      return events.filter((event: BetEvent) =>
        event.home_team.toLowerCase().includes(query.toLowerCase()) ||
        event.away_team.toLowerCase().includes(query.toLowerCase()) ||
        event.sport_title.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  getEventDetails: async (sport: string, eventId: string): Promise<BetEvent> => {
    if (!hasValidApiKey) {
      console.log('Using mock data for event details');
      await new Promise(resolve => setTimeout(resolve, 500));
      const events = generateMockEvents(sport);
      return events.find(event => event.id === eventId) || events[0];
    }

    try {
      const response = await api.get(`/sports/${sport}/events/${eventId}/odds/`, {
        params: {
          regions: 'us',
          markets: 'h2h,spreads,totals',
          oddsFormat: 'american',
          dateFormat: 'iso',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching event details:', error);
      throw error;
    }
  },
};

export default api;
