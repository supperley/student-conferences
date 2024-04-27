import { useNavigate, useParams } from 'react-router-dom';
import { userReports } from '../../shared/data/mockData';
import { Button, Link } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { ReportCard } from '../../components/ReportCard/ReportCard';
import { CommentsList } from '../../components/CommentsList/CommentsList';

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
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <h1 className="font-bold text-4xl">{reportData?.title}</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button color="success" variant="flat">
            Принять
          </Button>
          <Button color="danger" variant="flat">
            Отклонить
          </Button>
          <Button color="danger" variant="flat">
            Отменить заявку
          </Button>
        </div>
      </div>
      <ReportCard reportData={reportData} />
      <div className="mb-5">{reportData.description}</div>
      <CommentsList />
    </div>
  );
};

export default Report;
