import { Button, Link } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/slices/authSlice';

const Home = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Студенческие конференции БНТУ
        </h1>
        <p className="mt-8 text-lg text-slate-600 text-center max-w-4xl mx-auto dark:text-slate-400">
          Добро пожаловать на сайт студенческих конференций Белорусского национального технического
          университета (БНТУ)! Здесь вы найдете информацию о наших мероприятиях, где студенты
          делятся своими исследованиями, обсуждают актуальные темы и вдохновляют друг друга на новые
          достижения. Присоединяйтесь к нам в этом захватывающем путешествии открытий и знаний!
        </p>
        <div className="mt-4 sm:mt-6 flex justify-center space-x-6 text-sm">
          <Button
            href={isAuthenticated ? '/conferences' : '/login'}
            as={Link}
            color="primary"
            className="w-40 h-12 font-bold mt-3">
            Начать
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
