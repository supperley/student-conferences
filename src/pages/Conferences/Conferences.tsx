import ConferencesList from '../../components/ConferencesList/ConferencesList';

const Conferences = () => {
  return (
    <div className="my-5">
      <div className="mt-5 mb-2 text-center">
        <h1 className="mb-2 font-bold text-4xl">Студенческие конференции</h1>
        <h5 className="text-default-500 text-lg">
          Все студенческие научно-технические конференции БНТУ
        </h5>
      </div>
      <ConferencesList />
    </div>
  );
};

export default Conferences;
