import { Outlet } from 'react-router-dom';
import Header from '../../widgets/Header/Header';

const PageLayout = () => {
  return (
    <>
      <div>
        <Header />
        <main className="container mx-auto px-10 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default PageLayout;
