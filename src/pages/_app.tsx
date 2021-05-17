import { ChallangesProvider } from "../contexts/ChallangesContext";
import { CountdownProvider } from "../contexts/CountdownContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChallangesProvider>
      <Component {...pageProps} />
    </ChallangesProvider>
  );
}

export default MyApp;
