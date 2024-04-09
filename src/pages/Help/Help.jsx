import { CardList } from '../../components/CardList/CardList';
import { news } from '../../shared/data/mockData';

const Help = () => {
  return (
    <div className="w-full lg:px-16 my-10">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">Помощь</h1>
        <h5 className="text-default-500 text-lg">
          Инструкции для проведения студенческих научно-технических конференций БНТУ
        </h5>
      </div>
      <CardList list={news} />
    </div>
  );
};

export default Help;
