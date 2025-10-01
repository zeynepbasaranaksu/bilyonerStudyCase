import { motion } from 'framer-motion';
import { Box, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  loadingContainer: {
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
  spinner: {
    marginBottom: theme.spacing(2),
  },
  text: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
    fontWeight: 500,
  },
}));

const LoadingSpinner = () => {
  const { classes } = useStyles();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box className={classes.loadingContainer}>
        <CircularProgress 
          size={60} 
          className={classes.spinner}
          sx={{ color: '#10b981' }}
        />
        <Typography className={classes.text}>
          Etkinlikler yükleniyor...
        </Typography>
      </Box>
    </motion.div>
  );
};

export default LoadingSpinner;
