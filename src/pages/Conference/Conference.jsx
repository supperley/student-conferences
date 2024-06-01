import { Button, Skeleton, useDisclosure } from '@nextui-org/react';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ConferenceCard } from '../../components/ConferenceCard/ConferenceCard';
import { Link } from '../../components/Link/Link';
import ReportsList from '../../components/ReportsList/ReportsList';
import CancelConferenceModal from '../../components/modal/CancelConferenceModal/CancelConferenceModal';
import ConferenceModal from '../../components/modal/ConferenceModal/ConferenceModal';
import DeleteConferenceModal from '../../components/modal/DeleteConferenceModal/DeleteConferenceModal';
import {
  useGetConferenceByIdQuery,
  useUpdateConferenceMutation,
} from '../../redux/services/conferenceApi';
import { useGetAllReportsQuery } from '../../redux/services/reportApi';
import { selectUser } from '../../redux/slices/authSlice';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { BASE_URL } from '../../shared/config/constants';
import { getErrorField } from '../../shared/utils/getErrorField';

const fetchConferenceParticipants = async (conferenceId) => {
  const response = await fetch(`${BASE_URL}/api/conferences/${conferenceId}/participants`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const blob = await response.blob();
  return blob;
};

const Conference = () => {
  const navigate = useNavigate();
  const params = useParams();
  const conferenceId = params.conferenceId;

  const {
    data: conferenceData,
    errorConference,
    isLoading: isConferenceLoading,
  } = useGetConferenceByIdQuery(conferenceId);
  const {
    data: conferenceReports,
    errorReports,
    isLoading: isReportsLoading,
  } = useGetAllReportsQuery({ conferenceId });
  const [updateConference, { isLoading: isUpdateLoading }] = useUpdateConferenceMutation();

  const user = useSelector(selectUser);

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

  const onSubmitStatus = async (conference, status) => {
    try {
      const data = { id: conference._id, conferenceData: { status } };
      await updateConference(data).unwrap();
    } catch (err) {
      console.log(err);
      toast.error(getErrorField(err));
    }
  };

  const onDownloadParticipants = async () => {
    try {
      const blob = await fetchConferenceParticipants(conferenceId);
      console.log(blob);
      if (blob) {
        saveAs(blob, 'test.docx');
      } else {
        throw new Error('Failed to download file');
      }
    } catch (err) {
      console.log(err);
      toast.error(getErrorField(err));
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
      {errorConference ? (
        <div>Произошла ошибка</div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <Skeleton isLoaded={!isConferenceLoading} className="rounded-lg">
              <h1 className="font-bold text-4xl">{conferenceData?.title}</h1>
            </Skeleton>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* {(user?._id === conferenceData?.administrator?._id || user?.role === 'admin') &&
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
                )} */}
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
          <ConferenceCard
            conferenceData={!isConferenceLoading ? conferenceData : {}}
            isLoading={isConferenceLoading}
          />
          {conferenceData?.description && (
            <>
              <h2 className="font-bold text-3xl">Описание</h2>
              <Skeleton isLoaded={!isConferenceLoading} className="rounded-lg my-6">
                <div className="whitespace-pre-line">{conferenceData?.description}</div>
              </Skeleton>
            </>
          )}
          <div className="flex justify-between">
            <h2 className="font-bold text-3xl mb-3">Список поданных заявок</h2>
            <Button
              variant="flat"
              onPress={() => {
                onDownloadParticipants();
              }}>
              Скачать список
            </Button>
          </div>
          {errorReports ? (
            <ReportsList
              reports={[]}
              emptyText={'Произошла ошибка'}
              initialVisibleColumns={['title', 'author', 'status', 'actions']}
              reportSearchColumns={['title']}
            />
          ) : (
            <ReportsList
              reports={conferenceReports || []}
              isParentLoading={isReportsLoading}
              initialVisibleColumns={['title', 'author', 'status', 'actions']}
              reportSearchColumns={['title']}
            />
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
