import ReportsList from '../../components/ReportsList/ReportsList';
import { useGetAllReportsQuery } from '../../redux/services/reportApi';

const Reports = () => {
  const allData = useGetAllReportsQuery();
  const { data, error, isLoading } = allData;

  return (
    <>
      {error ? (
        <ReportsList reports={[]} emptyText={'Произошла ошибка'} />
      ) : (
        <ReportsList reports={data || []} isParentLoading={isLoading} />
      )}
    </>
  );
};

export default Reports;
