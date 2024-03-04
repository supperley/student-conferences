import { NewsList } from '../../components/NewsList/NewsList';
import { posts } from '../../shared/data/mockData';

const Help = () => {
  return (
    <div className="w-full lg:px-16 mt-12">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">Помощь</h1>
        <h5 className="text-default-500 text-lg">
          Инструкции для проведения студенческих научно-технических конференций БНТУ
        </h5>
      </div>
      <NewsList posts={posts} />
    </div>
  );
};

export default Help;
