import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SocketProvider } from '../../utils/socketContext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // PrimeReact theme
import 'primereact/resources/primereact.min.css';                 // PrimeReact core CSS
import 'primeicons/primeicons.css';                               // PrimeIcons
import 'primeflex/primeflex.css';                                 // PrimeFlex (Optional)



export default function App({ Component, pageProps }: AppProps) {
  return (
  <SocketProvider>
  <Component {...pageProps} />
  </SocketProvider>
  );
}
