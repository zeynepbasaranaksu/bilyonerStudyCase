import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { authService } from '../../services/auth';
import { clearCart } from '../../store/slices/cartSlice';
import { setUser } from '../../store/slices/userSlice';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Badge,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  header: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  logo: {
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
  logoText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
    },
  },
  nav: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      gap: theme.spacing(2),
    },
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 500,
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  userEmail: {
    fontSize: '0.9rem',
    opacity: 0.9,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logoutBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-2px)',
    },
  },
  loginBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-2px)',
    },
  },
}));

const Header = () => {
  const { classes } = useStyles();
  const { user } = useAppSelector((state) => state.user);
  const { totalEvents } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      dispatch(setUser(null));
      dispatch(clearCart());
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar position="sticky" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.logo}>
            <Typography variant="h6" className={classes.logoText}>
              Spor Bahisleri
            </Typography>
          </Link>

          <Box className={classes.nav}>
            <Link to="/" className={classes.navLink}>
              Etkinlikler
            </Link>
            <Link to="/basket" className={classes.navLink}>
              {totalEvents > 0 ? (
                <Badge 
                  badgeContent={totalEvents} 
                  color="error"
                  sx={{ 
                    '& .MuiBadge-badge': {
                      right: -8,
                      top: 12,
                    }
                  }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                    style={{ display: 'inline-block', padding: '0 8px' }}
                  >
                    Sepet
                  </motion.span>
                </Badge>
              ) : (
                <span>Sepet</span>
              )}
            </Link>
          </Box>

          <Box className={classes.userSection}>
            {user ? (
              <Box className={classes.userInfo}>
                <Typography variant="body2" className={classes.userEmail}>
                  {user.email}
                </Typography>
                <Button onClick={handleLogout} className={classes.logoutBtn}>
                  Çıkış Yap
                </Button>
              </Box>
            ) : (
              <Link to="/login" className={classes.loginBtn}>
                Giriş Yap
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;
