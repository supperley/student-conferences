import { useNavigate, useParams } from 'react-router-dom';
import { Button, Link, Skeleton, useDisclosure } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { ReportCard } from '../../components/ReportCard/ReportCard';
import { CommentsList } from '../../components/CommentsList/CommentsList';
import { useGetReportByIdQuery, useUpdateReportMutation } from '../../redux/services/reportApi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import CancelReportModal from '../../components/modal/CancelReportModal/CancelReportModal';

const Report = () => {
  const navigate = useNavigate();
  const params = useParams();
  const reportId = params.reportId;
  const { data: reportData, error, isLoading } = useGetReportByIdQuery(reportId);
  const [modalReport, setModalReport] = useState(undefined);
  const [updateReport, { isUpdateLoading }] = useUpdateReportMutation();
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
      if (hasErrorField(err)) {
        setError(err?.data?.message || err?.error);
      }
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
                {user?.role === 'admin' && reportData?.status !== 'accepted' && (
                  <Button
                    onPress={() => {
                      onSubmitStatus(reportData, 'accepted');
                    }}
                    color="success"
                    variant="flat">
                    Принять
                  </Button>
                )}
                {user?.role === 'admin' && reportData?.status !== 'declined' && (
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
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              <div className="mb-6">{reportData?.description}</div>
            </Skeleton>
            <CommentsList comments={reportData?.comments} />
          </>
        )}
      </div>
      <CancelReportModal
        isOpen={isOpenModalCancel}
        onOpen={onOpenModalCancel}
        onOpenChange={onOpenChangeModalCancel}
        report={modalReport}
        onSubmitStatus={onSubmitStatus}
      />
    </>
  );
};

export default Report;
