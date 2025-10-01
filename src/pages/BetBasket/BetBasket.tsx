import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { removeFromCart, clearCart } from '../../store/slices/cartSlice';
import { analyticsService } from '../../services/analytics';
import CartItem from '../../components/CartItem/CartItem';
import EmptyCart from '../../components/EmptyCart/EmptyCart';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  betBasket: {
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
  basketContent: {
    display: 'grid',
    gridTemplateColumns: '1fr', 
    gap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 350px',
    },
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  cartSummary: {
    height: 'fit-content',
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: theme.spacing(2),
    },
  },
  summaryCard: {
    background: 'white',
    borderRadius: '15px',
    padding: theme.spacing(2),
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e8ed',
  },
  summaryTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: theme.spacing(1.5),
    textAlign: 'center',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0.75, 0),
    borderBottom: '1px solid #e1e8ed',
    fontSize: '1rem',
    '&:last-of-type': {
      borderBottom: 'none',
    },
    '&.total': {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      background: '#f8f9fa',
      padding: theme.spacing(1),
      borderRadius: '8px',
      marginTop: theme.spacing(1),
    },
  },
  summaryActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  clearBtn: {
    background: '#e74c3c',
    color: 'white',
    '&:hover': {
      background: '#c0392b',
      transform: 'translateY(-2px)',
    },
  },
  placeBetBtn: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
      transform: 'translateY(-2px)',
    },
  },
}));

const BetBasket = () => {
  const { classes } = useStyles();
  const { items, totalPrice, totalEvents } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (itemId: string) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      analyticsService.logRemoveFromCartEvent(item);
    }
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceBet = () => {
    if (!user) {
      alert('Bahis yapmak için lütfen giriş yapın');
      return;
    }
    
    alert('Bahis başarıyla gerçekleştirildi!');
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Box className={classes.betBasket}>
      <Container maxWidth={false} sx={{ px: 2 }}>
        <motion.div
          className={classes.headerSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" className={classes.title}>
            Bahis Sepetiniz
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            {totalEvents} etkinlik • {items.length} bahis
          </Typography>
        </motion.div>

        <Box className={classes.basketContent}>
          <motion.div
            className={classes.cartItems}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CartItem
                  item={item}
                  onRemove={() => handleRemoveItem(item.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={classes.cartSummary}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className={classes.summaryCard}>
              <CardContent>
                <Typography variant="h5" className={classes.summaryTitle}>
                  Bahis Özeti
                </Typography>
                
                <Box className={classes.summaryRow}>
                  <span>Toplam Etkinlik:</span>
                  <span>{totalEvents}</span>
                </Box>
                
                <Box className={classes.summaryRow}>
                  <span>Toplam Bahis:</span>
                  <span>{items.length}</span>
                </Box>
                
                <Box className={`${classes.summaryRow} total`}>
                  <span>Toplam Tutar:</span>
                  <span>₺{totalPrice.toFixed(2)}</span>
                </Box>

                <Box className={classes.summaryActions}>
                  <Button
                    className={classes.clearBtn}
                    onClick={handleClearCart}
                    variant="contained"
                    fullWidth
                  >
                    Tümünü Temizle
                  </Button>
                  
                  <Button
                    className={classes.placeBetBtn}
                    onClick={handlePlaceBet}
                    variant="contained"
                    fullWidth
                  >
                    Bahis Yap
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default BetBasket;
