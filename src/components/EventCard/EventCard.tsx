import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../store/slices/cartSlice';
import { analyticsService } from '../../services/analytics';
import type { BetEvent, CartItem, Bookmaker, Market, Outcome } from '../../types';
import { Card, CardContent, Typography, Button, Box, Chip, Collapse } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  eventCard: {
    background: 'white',
    borderRadius: '15px',
    padding: theme.spacing(1.5),
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    border: '1px solid #e1e8ed',
    '&:hover': {
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    },
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  sportBadge: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  eventTime: {
    color: '#7f8c8d',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  teams: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1, 0),
    borderBottom: '1px solid #e1e8ed',
  },
  team: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#2c3e50',
    textAlign: 'center',
    flex: 1,
  },
  homeTeam: {
    textAlign: 'right',
    paddingRight: theme.spacing(1),
  },
  awayTeam: {
    textAlign: 'left',
    paddingLeft: theme.spacing(1),
  },
  vs: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    fontWeight: 500,
    background: '#f8f9fa',
    padding: '0.5rem',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmakers: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  bookmaker: {
    border: '1px solid #e1e8ed',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  bookmakerHeader: {
    width: '100%',
    background: '#f8f9fa',
    border: 'none',
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      background: '#e9ecef',
    },
  },
  bookmakerName: {
    fontWeight: 600,
    color: '#2c3e50',
  },
  expandIcon: {
    fontSize: '1.2rem',
    color: '#10b981',
    fontWeight: 'bold',
  },
  bookmakerOdds: {
    padding: theme.spacing(1),
    background: 'white',
  },
  market: {
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  marketTitle: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    marginBottom: theme.spacing(0.5),
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  outcomes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: theme.spacing(0.5),
  },
  outcomeBtn: {
    background: 'white',
    border: '2px solid #e1e8ed',
    color: '#2c3e50',
    padding: theme.spacing(0.75),
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(0.25),
    '&:hover': {
      borderColor: '#10b981',
      background: '#f0fdf4',
      transform: 'translateY(-2px)',
    },
  },
  outcomeName: {
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  outcomePrice: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#10b981',
  },
}));

interface EventCardProps {
  event: BetEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const { classes } = useStyles();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [expandedBookmaker, setExpandedBookmaker] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddToCart = (bookmaker: Bookmaker, market: Market, outcome: Outcome) => {
    if (!user) {
      alert('Sepete bahis eklemek için lütfen giriş yapın');
      return;
    }

    const cartItem: CartItem = {
      id: `${event.id}-${bookmaker.key}-${market.key}-${outcome.name}`,
      event,
      bookmaker,
      market,
      outcome,
    };

    dispatch(addToCart(cartItem));
    analyticsService.logAddToCartEvent(cartItem);
  };

  const toggleBookmaker = (bookmakerKey: string) => {
    setExpandedBookmaker(
      expandedBookmaker === bookmakerKey ? null : bookmakerKey
    );
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={classes.eventCard}>
        <CardContent>
          <Box className={classes.eventHeader}>
            <Chip label={event.sport_title} className={classes.sportBadge} />
            <Typography className={classes.eventTime}>
              {formatDate(event.commence_time)}
            </Typography>
          </Box>

          <Box className={classes.teams}>
            <Typography className={`${classes.team} ${classes.homeTeam}`}>
              {event.home_team}
            </Typography>
            <Box className={classes.vs}>VS</Box>
            <Typography className={`${classes.team} ${classes.awayTeam}`}>
              {event.away_team}
            </Typography>
          </Box>

          <Box className={classes.bookmakers}>
            {event.bookmakers.slice(0, 2).map((bookmaker) => (
              <Box key={bookmaker.key} className={classes.bookmaker}>
                <Button
                  className={classes.bookmakerHeader}
                  onClick={() => toggleBookmaker(bookmaker.key)}
                  fullWidth
                >
                  <Typography className={classes.bookmakerName}>
                    {bookmaker.title}
                  </Typography>
                  <Typography className={classes.expandIcon}>
                    {expandedBookmaker === bookmaker.key ? '−' : '+'}
                  </Typography>
                </Button>

                <Collapse in={expandedBookmaker === bookmaker.key}>
                  <Box className={classes.bookmakerOdds}>
                    {bookmaker.markets.map((market) => (
                      <Box key={market.key} className={classes.market}>
                        <Typography className={classes.marketTitle}>
                          {market.key === 'h2h' ? 'Maç Kazananı' : market.key}
                        </Typography>
                        <Box className={classes.outcomes}>
                          {market.outcomes.map((outcome, index) => (
                            <Button
                              key={index}
                              className={classes.outcomeBtn}
                              onClick={() => handleAddToCart(bookmaker, market, outcome)}
                            >
                              <Typography className={classes.outcomeName}>
                                {outcome.name}
                              </Typography>
                              <Typography className={classes.outcomePrice}>
                                {outcome.price > 0 ? '+' : ''}
                                {outcome.price}
                              </Typography>
                            </Button>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard;
