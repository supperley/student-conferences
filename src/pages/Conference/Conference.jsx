import { useNavigate, useParams } from 'react-router-dom';
import { Button, Link, Skeleton, useDisclosure } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { ConferenceCard } from '../../components/ConferenceCard/ConferenceCard';
import { useGetConferenceByIdQuery } from '../../redux/services/conferenceApi';
import ConferenceModal from '../../components/modal/ConferenceModal/ConferenceModal';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';

const Conference = () => {
  const navigate = useNavigate();
  const params = useParams();
  const conferenceId = params.conferenceId;
  const { data: conferenceData, error, isLoading } = useGetConferenceByIdQuery(conferenceId);
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();
  const user = useSelector(selectUser);

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
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              <h1 className="font-bold text-4xl">{conferenceData?.title}</h1>
            </Skeleton>
            {(user?._id === conferenceData?.administrator?._id || user?.role === 'admin') && (
              <Button
                color="primary"
                variant="flat"
                onPress={() => {
                  onOpenModalEdit();
                }}>
                Редактировать
              </Button>
            )}
          </div>
          <ConferenceCard conferenceData={!isLoading ? conferenceData : {}} isLoading={isLoading} />
          {conferenceData?.description && (
            <>
              <h2 className="font-bold text-3xl">Описание</h2>
              <Skeleton isLoaded={!isLoading} className="rounded-lg my-6">
                <div>{conferenceData?.description}</div>
              </Skeleton>
            </>
          )}
          <ConferenceModal
            isOpen={isOpenModalEdit}
            onOpen={onOpenModalEdit}
            onOpenChange={onOpenChangeModalEdit}
            conference={conferenceData}
            mode={'edit'}
          />
        </>
      )}
    </div>
  );
};

export default Conference;
