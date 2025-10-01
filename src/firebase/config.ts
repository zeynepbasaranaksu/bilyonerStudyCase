import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Check if we have valid Firebase configuration
const hasValidConfig = import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'demo_api_key' &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'demo-project-id';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let analytics: Analytics | null = null;

if (hasValidConfig) {
  try {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else {
  console.warn('Firebase configuration not found. Authentication will be disabled.');
}

export { auth, analytics };
export default app;
