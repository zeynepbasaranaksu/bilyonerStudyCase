import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    margin: theme.spacing(2, 0),
  },
  errorIcon: {
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
  },
  errorTitle: {
    fontSize: '1.5rem',
    color: '#e74c3c',
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  retryButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: theme.spacing(1, 2),
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
      transform: 'translateY(-2px)',
    },
  },
}));

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  const { classes } = useStyles();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box className={classes.errorContainer}>
        <Box className={classes.errorIcon}>⚠️</Box>
        <Box className={classes.errorTitle}>Hata! Bir şeyler yanlış gitti</Box>
        <Box className={classes.errorMessage}>{message}</Box>
        {onRetry && (
          <motion.button
            className={classes.retryButton}
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tekrar Dene
          </motion.button>
        )}
      </Box>
    </motion.div>
  );
};

export default ErrorMessage;
