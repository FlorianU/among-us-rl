import { AmongUsProvider } from "../context/main-data";

import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return <AmongUsProvider><Component {...pageProps} />
  </AmongUsProvider>;
}
