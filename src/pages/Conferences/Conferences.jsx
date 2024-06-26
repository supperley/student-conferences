import ConferencesList from '../../components/ConferencesList/ConferencesList';
import { useGetAllConferencesQuery } from '../../redux/services/conferenceApi';

const Conferences = () => {
  const { data, error, isLoading } = useGetAllConferencesQuery();

  return (
    <div className="my-5">
      <div className="mt-5 mb-2 text-center">
        <h1 className="mb-2 font-bold text-4xl">Студенческие конференции</h1>
        <h5 className="text-default-500 text-lg">
          Все студенческие научно-технические конференции БНТУ
        </h5>
      </div>
      {/* {console.log('rerender Conferences', allData)} */}
      {error ? (
        <ConferencesList conferences={[]} emptyText={'Произошла ошибка'} />
      ) : (
        <ConferencesList conferences={data || []} isParentLoading={isLoading} />
      )}
    </div>
  );
};

export default Conferences;
