import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchEvents, searchEvents, setSearchQuery } from '../../store/slices/eventsSlice';
import EventCard from '../../components/EventCard/EventCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Box, Container, Typography, Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  betBulletin: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: theme.spacing(2, 0),
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: theme.spacing(0.5),
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem', 
    },
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#7f8c8d',
    margin: 0,
  },
  filtersSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  sportFilters: {
    display: 'flex',
    gap: theme.spacing(1),
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  sportFilter: {
    background: 'white',
    border: '2px solid #e1e8ed',
    color: '#2c3e50',
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
    '&.active': {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      borderColor: 'transparent',
    },
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))', 
    gap: theme.spacing(2),
  },
  noEvents: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: theme.spacing(4, 2),
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
  },
  noEventsTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: theme.spacing(1),
  },
  noEventsText: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
  },
}));

const BetBulletin = () => {
  const { classes } = useStyles();
  const { events, loading, error, searchQuery } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();
  const [selectedSport, setSelectedSport] = useState('soccer');

  useEffect(() => {
    dispatch(fetchEvents(selectedSport));
  }, [dispatch, selectedSport]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    if (query.trim()) {
      dispatch(searchEvents({ sport: selectedSport, query }));
    } else {
      dispatch(fetchEvents(selectedSport));
    }
  };

  const sports = [
    { key: 'soccer', label: 'Futbol' },
    { key: 'basketball', label: 'Basketbol' },
    { key: 'americanfootball', label: 'Amerikan Futbolu' },
    { key: 'tennis', label: 'Tenis' },
    { key: 'hockey', label: 'Hokey' },
  ];

  return (
    <Box className={classes.betBulletin}>
      <Container maxWidth={false} sx={{ px: 2 }}>
        <motion.div
          className={classes.headerSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" className={classes.title}>
            Spor Bahis Etkinlikleri
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Favori spor etkinliklerinizi bulun ve bahis yapın
          </Typography>
        </motion.div>

        <motion.div
          className={classes.filtersSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box className={classes.sportFilters}>
            {sports.map((sport) => (
              <Button
                key={sport.key}
                className={`${classes.sportFilter} ${selectedSport === sport.key ? 'active' : ''}`}
                onClick={() => setSelectedSport(sport.key)}
                variant={selectedSport === sport.key ? 'contained' : 'outlined'}
              >
                {sport.label}
              </Button>
            ))}
          </Box>

          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Etkinlik ara..."
          />
        </motion.div>

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <motion.div
            className={classes.eventsGrid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {events.length === 0 ? (
              <Box className={classes.noEvents}>
                <Typography variant="h5" className={classes.noEventsTitle}>
                  Etkinlik bulunamadı
                </Typography>
                <Typography variant="body1" className={classes.noEventsText}>
                  Aramanızı değiştirin veya farklı bir spor seçin
                </Typography>
              </Box>
            ) : (
              events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default BetBulletin;
