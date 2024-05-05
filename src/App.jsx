import { NextUIProvider } from '@nextui-org/react';
import Router from './pages/Router';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'sonner';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Toaster />
      <Provider store={store}>
        <NextUIProvider navigate={navigate}>
          <Router />
        </NextUIProvider>
      </Provider>
    </>
  );
}

export default App;
