import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Router from './pages/Router';
import { store } from './redux/store';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Toaster richColors />
      <Provider store={store}>
        <NextUIProvider navigate={navigate}>
          <Router />
        </NextUIProvider>
      </Provider>
    </>
  );
}

export default App;
