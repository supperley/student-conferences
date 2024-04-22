import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { BrowserRouter } from 'react-router-dom';

async function enableMocking() {
  if (!import.meta.env.VITE_VERCEL_ENV) {
    return;
  }

  const { worker } = await import('./shared/mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
});
