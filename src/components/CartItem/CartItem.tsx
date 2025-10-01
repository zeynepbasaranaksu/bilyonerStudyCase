import { motion } from 'framer-motion';
import type { CartItem as CartItemType } from '../../types';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  cartItem: {
    background: 'white',
    borderRadius: '15px',
    padding: theme.spacing(1.5),
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e8ed',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    },
  },
  itemHeader: {
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
  removeButton: {
    background: '#e74c3c',
    color: 'white',
    minWidth: '32px',
    width: '32px',
    height: '32px',
    padding: 0,
    borderRadius: '50%',
    fontSize: '1.2rem',
    '&:hover': {
      background: '#c0392b',
      transform: 'scale(1.1)',
    },
  },
  teams: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
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
  betDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  betInfo: {
    flex: 1,
  },
  betName: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#2c3e50',
    marginBottom: theme.spacing(0.25),
  },
  betBookmaker: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
  },
  betPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#10b981',
  },
}));

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
}

const CartItem = ({ item, onRemove }: CartItemProps) => {
  const { classes } = useStyles();
  

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={classes.cartItem}>
        <CardContent>
          <Box className={classes.itemHeader}>
            <Chip label={item.event.sport_title} className={classes.sportBadge} />
            <Button className={classes.removeButton} onClick={onRemove}>
              ✕
            </Button>
          </Box>

          <Box className={classes.teams}>
            <Typography className={`${classes.team} ${classes.homeTeam}`}>
              {item.event.home_team}
            </Typography>
            <Box className={classes.vs}>VS</Box>
            <Typography className={`${classes.team} ${classes.awayTeam}`}>
              {item.event.away_team}
            </Typography>
          </Box>

          <Box className={classes.betDetails}>
            <Box className={classes.betInfo}>
              <Typography className={classes.betName}>
                {item.outcome.name}
              </Typography>
              <Typography className={classes.betBookmaker}>
                {item.bookmaker.title} • {item.market.key === 'h2h' ? 'Maç Kazananı' : item.market.key}
              </Typography>
            </Box>

            <Box className={classes.betPrice}>
              {item.outcome.price > 0 ? '+' : ''}
              {item.outcome.price}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CartItem;
