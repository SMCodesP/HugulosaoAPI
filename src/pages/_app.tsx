import type { AppProps } from 'next/app';

import { dark } from '@/themes/dark';

import { FadingBackground, GlobalStyles } from '@/styles/GlobalStyles';

import { SWRConfig } from 'swr';
import { ThemeProvider } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import AuthProvider from '@/contexts/auth';
import { ToastContainer } from 'react-toastify';

import { api } from '@/services/api';

import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={dark}>
      <SWRConfig
        value={{
          fetcher: (url) => api.get(url).then((res) => res.data),
        }}
      >
        <ModalProvider backgroundComponent={FadingBackground}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ModalProvider>
      </SWRConfig>

      <ToastContainer theme="dark" position="bottom-right" />
      <GlobalStyles />
    </ThemeProvider>
  );
}
