import { useNavigate, useParams } from 'react-router-dom';
import { userReports } from '../../shared/data/mockData';
import { Button, Link } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { Comments } from '../../components/Comments/Comments';
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
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">{reportData.title}</h1>
        <div className="flex gap-3">
          <Button className="hover:text-success" variant="solid">
            Принять
          </Button>
          <Button className="hover:text-danger" variant="solid">
            Отклонить
          </Button>
          <Button className="hover:text-danger" variant="solid">
            Отменить заявку
          </Button>
        </div>
      </div>
      <ReportCard reportData={reportData} />
      <div className="mb-5">{reportData.description}</div>
      <Comments />
    </div>
  );
};

export default Report;
