import { NextUIProvider } from '@nextui-org/react';
import Router from './pages/Router';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Router />
    </NextUIProvider>
  );
}

export default App;
