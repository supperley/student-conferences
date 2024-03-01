import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Студенческие конференции БНТУ
        </h1>
        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fuga sit reprehenderit
          corporis atque asperiores, quidem suscipit repudiandae tenetur debitis quod libero labore
          aliquam sed ad odit, qui cupiditate eligendi?
        </p>
        <div className="mt-4 sm:mt-6 flex justify-center space-x-6 text-sm">
          <NavLink
            className=" bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-40 flex items-center justify-center dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
            to="/login">
            Начать
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
