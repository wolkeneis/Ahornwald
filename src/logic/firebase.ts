import { getAnalytics, logEvent } from "firebase/analytics";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCKAVCrpLmU54T_m8v-Os1mFHIHR45Chms",
  authDomain: "wolkeneis.dev",
  databaseURL: "https://wolkeneis-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wolkeneis",
  storageBucket: "wolkeneis.appspot.com",
  messagingSenderId: "261869740964",
  appId: "1:261869740964:web:c71e325adc42394bf41731",
  measurementId: "G-DKRL667E0V"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);
auth.useDeviceLanguage();

logEvent(analytics, "analytics_setup", { profile: auth.currentUser });

export default app;

export { analytics, auth };
