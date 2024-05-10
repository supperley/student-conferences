import { useNavigate, useParams } from 'react-router-dom';
import { Button, Link, Skeleton, useDisclosure } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { ConferenceCard } from '../../components/ConferenceCard/ConferenceCard';
import {
  useGetConferenceByIdQuery,
  useUpdateConferenceMutation,
} from '../../redux/services/conferenceApi';
import ConferenceModal from '../../components/modal/ConferenceModal/ConferenceModal';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { toast } from 'sonner';
import DeleteConferenceModal from '../../components/modal/DeleteConferenceModal/DeleteConferenceModal';
import CancelConferenceModal from '../../components/modal/CancelConferenceModal/CancelConferenceModal';

const Conference = () => {
  const navigate = useNavigate();
  const params = useParams();
  const conferenceId = params.conferenceId;
  const { data: conferenceData, error, isLoading } = useGetConferenceByIdQuery(conferenceId);
  const {
    isOpen: isOpenModalCancel,
    onOpen: onOpenModalCancel,
    onOpenChange: onOpenChangeModalCancel,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onOpenChange: onOpenChangeModalDelete,
  } = useDisclosure();
  const user = useSelector(selectUser);
  const [updateConference, { isLoading: isUpdateLoading }] = useUpdateConferenceMutation();

  const onSubmitStatus = async (conference, status) => {
    try {
      const data = { id: conference._id, conferenceData: { status } };
      await updateConference(data).unwrap();
    } catch (err) {
      console.log(err);
      toast(JSON.stringify(err));
    }
  };

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
            <div className="flex flex-col sm:flex-row gap-3">
              {(user?._id === conferenceData?.administrator?._id || user?.role === 'admin') &&
                conferenceData?.status !== 'declined' && (
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      onOpenModalCancel();
                    }}>
                    Отменить проведение
                  </Button>
                )}
              {(user?._id === conferenceData?.administrator?._id || user?.role === 'admin') &&
                conferenceData?.status !== 'registrationClosed' && (
                  <Button
                    color="warning"
                    variant="flat"
                    onPress={() => {
                      onSubmitStatus(conferenceData, 'registrationClosed');
                    }}>
                    Закрыть регистрацию
                  </Button>
                )}
              {(user?._id === conferenceData?.administrator?._id || user?.role === 'admin') &&
                conferenceData?.status !== 'registrationOpen' && (
                  <Button
                    color="success"
                    variant="flat"
                    onPress={() => {
                      onSubmitStatus(conferenceData, 'registrationOpen');
                    }}>
                    Открыть регистрацию
                  </Button>
                )}
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
              {(user?._id === conferenceData?.administrator?._id || user?.role === 'admin') && (
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onOpenModalDelete();
                  }}>
                  Удалить
                </Button>
              )}
            </div>
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
          <CancelConferenceModal
            isOpen={isOpenModalCancel}
            onOpen={onOpenModalCancel}
            onOpenChange={onOpenChangeModalCancel}
            conference={conferenceData}
            onSubmitStatus={onSubmitStatus}
            isLoading={isUpdateLoading}
          />
          <DeleteConferenceModal
            isOpen={isOpenModalDelete}
            onOpenChange={onOpenChangeModalDelete}
            conference={conferenceData}
          />
        </>
      )}
    </div>
  );
};

export default Conference;
