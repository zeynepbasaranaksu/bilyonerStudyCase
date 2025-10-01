import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  emptyCart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 4),
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    margin: theme.spacing(2, 0),
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: theme.spacing(2),
  },
  emptyTitle: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  emptyMessage: {
    color: '#7f8c8d',
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    lineHeight: 1.5,
  },
  browseButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: theme.spacing(1.5, 3),
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    display: 'inline-block',
    '&:hover': {
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
      transform: 'translateY(-2px)',
    },
  },
}));

const EmptyCart = () => {
  const { classes } = useStyles();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box className={classes.emptyCart}>
        <motion.div
          className={classes.emptyIcon}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
          }}
        >
          🛒
        </motion.div>
        
        <Typography variant="h3" className={classes.emptyTitle}>
          Sepetiniz boş
        </Typography>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'inline-block' }}
        >
          <Link to="/" className={classes.browseButton}>
            Etkinliklere Göz At
          </Link>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default EmptyCart;
