import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { EventsState } from '../../types';
import { bettingAPI } from '../../services/api';

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (sport: string = 'soccer') => {
    const response = await bettingAPI.getEvents(sport);
    return response;
  }
);

export const searchEvents = createAsyncThunk(
  'events/searchEvents',
  async ({ sport, query }: { sport: string; query: string }) => {
    const response = await bettingAPI.searchEvents(sport, query);
    return response;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      })
      .addCase(searchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(searchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search events';
      });
  },
});

export const { setSearchQuery, clearError } = eventsSlice.actions;
export default eventsSlice.reducer;
