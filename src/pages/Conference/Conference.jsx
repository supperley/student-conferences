import { useNavigate, useParams } from 'react-router-dom';
import { conferences } from '../../shared/data/mockData';
import { Button, Link, Skeleton } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { ConferenceCard } from '../../components/ConferenceCard/ConferenceCard';
import { useGetConferenceByIdQuery } from '../../redux/services/conferenceApi';

const Conference = () => {
  const navigate = useNavigate();
  const params = useParams();
  const conferenceId = params.conferenceId;
  const { data: conferenceData, error, isLoading } = useGetConferenceByIdQuery(conferenceId);
  // const conferenceData = conferences[conferenceId - 1];

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
      {error ? (
        <div>Произошла ошибка</div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row justify-between gap-5">
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              <h1 className="font-bold text-4xl">{conferenceData?.title}</h1>
            </Skeleton>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button color="primary" variant="flat">
                Редактировать
              </Button>
            </div>
          </div>
          <ConferenceCard conferenceData={!isLoading ? conferenceData : {}} isLoading={isLoading} />
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <div>{conferenceData?.description}</div>
          </Skeleton>
        </>
      )}
    </div>
  );
};

export default Conference;
