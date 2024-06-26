import { Button, Skeleton, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { CommentsList } from '../../components/CommentsList/CommentsList';
import { Link } from '../../components/Link/Link';
import { ReportCard } from '../../components/ReportCard/ReportCard';
import DeleteReportModal from '../../components/modal/DeleteReportModal/DeleteReportModal';
import { useGetReportByIdQuery, useUpdateReportMutation } from '../../redux/services/reportApi';
import { selectUser } from '../../redux/slices/authSlice';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { getErrorField } from '../../shared/utils/getErrorField';

const Report = () => {
  const navigate = useNavigate();
  const params = useParams();
  const reportId = params.reportId;
  const { data: reportData, error, isLoading } = useGetReportByIdQuery(reportId);
  const [modalReport, setModalReport] = useState(undefined);
  const [updateReport, { isLoading: isUpdateLoading }] = useUpdateReportMutation();
  const user = useSelector(selectUser);
  const {
    isOpen: isOpenModalCancel,
    onOpen: onOpenModalCancel,
    onOpenChange: onOpenChangeModalCancel,
  } = useDisclosure();

  const onSubmitStatus = async (report, status) => {
    try {
      const data = { id: report._id, reportData: { status } };
      // console.log(data);
      await updateReport(data).unwrap();
    } catch (err) {
      console.log(err);
      toast.error(getErrorField(err));
    }
  };

  return (
    <>
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
                <h1 className="font-bold text-4xl">{reportData?.title}</h1>
              </Skeleton>
              {/* {(user?._id === conferenceData?.administrator._id || user?.role === 'admin') && (
              <Button
                color="primary"
                variant="flat"
                onPress={() => {
                  onOpenModalEdit();
                }}>
                Редактировать
              </Button>
            )} */}
              <div className="flex flex-col sm:flex-row gap-3">
                {(user?.role === 'admin' || user?._id === reportData?.conference?.administrator) &&
                  reportData?.status !== 'accepted' && (
                    <Button
                      onPress={() => {
                        onSubmitStatus(reportData, 'accepted');
                      }}
                      color="success"
                      variant="flat">
                      Принять
                    </Button>
                  )}
                {(user?.role === 'admin' || user?._id === reportData?.conference?.administrator) &&
                  reportData?.status !== 'pending' && (
                    <Button
                      onPress={() => {
                        onSubmitStatus(reportData, 'pending');
                      }}
                      color="warning"
                      variant="flat">
                      На рассмотрение
                    </Button>
                  )}
                {(user?.role === 'admin' || user?._id === reportData?.conference?.administrator) &&
                  reportData?.status !== 'declined' && (
                    <Button
                      onPress={() => {
                        onSubmitStatus(reportData, 'declined');
                      }}
                      color="danger"
                      variant="flat">
                      Отклонить
                    </Button>
                  )}
                {user?._id === reportData?.author?._id && (
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      setModalReport(reportData);
                      onOpenModalCancel();
                    }}>
                    Удалить заявку
                  </Button>
                )}
              </div>
            </div>
            <ReportCard reportData={!isLoading ? reportData : {}} isLoading={isLoading} />
            {reportData?.description && (
              <>
                <h2 className="font-bold text-3xl">Описание</h2>
                <Skeleton isLoaded={!isLoading} className="rounded-lg my-6">
                  <div className="whitespace-pre-line">{reportData?.description}</div>
                </Skeleton>
              </>
            )}

            <CommentsList reportId={reportId} comments={reportData?.comments} />
          </>
        )}
      </div>
      <DeleteReportModal
        isOpen={isOpenModalCancel}
        onOpen={onOpenModalCancel}
        onOpenChange={onOpenChangeModalCancel}
        report={modalReport}
      />
    </>
  );
};

export default Report;
