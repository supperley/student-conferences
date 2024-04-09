import { NextUIProvider } from '@nextui-org/react';
import Router from './pages/Router';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  const navigate = useNavigate();

  return (
    <Provider store={store}>
      <NextUIProvider navigate={navigate}>
        <Router />
      </NextUIProvider>
    </Provider>
  );
}

export default App;
