import { ChallangesProvider } from "../contexts/ChallangesContext";
import { CountdownProvider } from "../contexts/CountdownContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
   
      <Component {...pageProps} />
   
  );
}

export default MyApp;
