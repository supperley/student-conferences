import { useNavigate, useParams } from 'react-router-dom';
import { userReports } from '../../shared/data/mockData';
import { Link } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { ConferenceCard } from '../../components/ConferenceCard/ConferenceCard';
import { ReportCard } from '../../components/ReportCard/ReportCard';

const Report = () => {
  const navigate = useNavigate();
  const params = useParams();
  const reportId = params.reportId;
  const reportData = userReports[reportId - 1];

  return (
    <div className="w-full lg:px-16 my-10">
      <div>
        <Link
          isBlock
          onClick={() => navigate(-1)}
          color="foreground"
          className="text-default-500 text-small mb-5 -ml-3">
          <ArrowIcon />
          Вернуться назад
        </Link>
      </div>
      <h1 className="mb-10 font-bold text-4xl">{reportData.title}</h1>
      <ReportCard reportData={reportData} />
      <div>{reportData.description}</div>
    </div>
  );
};

export default Report;
