import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './store';
import { ThemeProvider } from '@emotion/react';
import lightTheme from './theme/light'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);

