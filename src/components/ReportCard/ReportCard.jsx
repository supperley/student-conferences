import { Button, Card, Chip, Image, Skeleton, User, useDisclosure } from '@nextui-org/react';
import { saveAs } from 'file-saver';
import defaultReport from '../../shared/assets/images/default-report.jpg';
import { S3_URL } from '../../shared/config/constants';
import { reportStatusMap } from '../../shared/data/dataMap';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import { Link } from '../Link/Link';
import ReportModal from '../modal/ReportModal/ReportModal';

export const ReportCard = ({ reportData, isLoading = false }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="my-6 md:my-10 p-5 sm:p-10 flex md:flex-row md:justify-around gap-5 md:gap-10">
      <div className="lg:w-3/5 overflow-hidden flex justify-center items-center">
        <Skeleton isLoaded={!isLoading} className={`rounded-lg ${isLoading && 'w-96 h-64'}`}>
          <Link isExternal href={S3_URL + reportData?.fileUrl}>
            <Image
              className="max-h-96"
              alt="NextUI hero Image"
              src={reportData?.thumbUrl ? S3_URL + reportData?.thumbUrl : defaultReport}
            />
          </Link>
        </Skeleton>
      </div>
      <div className="flex lg:w-2/5 md:justify-center">
        <div className="flex flex-col w-full md:w-auto gap-10 justify-around">
          <div className="flex flex-col gap-4 min-w-[200px] md:min-w-[350px]">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-[120px]">Конференция</span>
              <Link
                isBlock
                href={`/conferences/${reportData?.conference?._id}`}
                color="foreground"
                className="text-default-500 text-small -ml-2">
                <Skeleton isLoaded={!isLoading} className="rounded-lg">
                  {reportData?.conference?.title}
                </Skeleton>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-[120px]">Состояние</span>
              <Skeleton isLoaded={!isLoading} className="rounded-lg -ml-1">
                <Chip color={reportStatusMap[reportData?.status]?.color} variant="flat">
                  {reportStatusMap[reportData?.status]?.name || 'default'}
                </Chip>
              </Skeleton>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-[120px]">Дата подачи</span>
              <div className="text-default-500 text-small">
                <Skeleton isLoaded={!isLoading} className="rounded-lg">
                  {formatToClientDate(reportData?.createdAt)}
                </Skeleton>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-[120px]">Автор</span>
              <Link
                isBlock
                href={'/users/' + reportData?.author?._id}
                color="foreground"
                className="text-default-500 text-small -ml-2">
                <Skeleton isLoaded={!isLoading} className="rounded-lg">
                  <User
                    name={reportData?.author?.first_name + ' ' + reportData?.author?.last_name}
                    description={reportData?.author?.position}
                    avatarProps={{
                      src: S3_URL + reportData?.author?.avatarUrl,
                    }}
                  />
                </Skeleton>
              </Link>
            </div>
            {reportData?.supervisor && (
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="w-[120px]">Научный руководитель</span>
                <Link
                  isBlock
                  href="/news"
                  color="foreground"
                  className="text-default-500 text-small -ml-2">
                  <Skeleton isLoaded={!isLoading} className="rounded-lg">
                    <User
                      name={
                        reportData?.supervisor?.first_name + ' ' + reportData?.supervisor?.last_name
                      }
                      description={reportData?.supervisor?.position}
                      avatarProps={{
                        src: S3_URL + reportData?.supervisor?.avatarUrl,
                      }}
                    />
                  </Skeleton>
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 md:items-center">
            <Button onPress={onOpen} color="primary" variant="solid" className="md:w-full">
              Редактировать
            </Button>
            {reportData?.fileUrl && (
              <Button
                as={Link}
                onClick={() => {
                  console.log('onclick');
                  saveAs(S3_URL + reportData?.fileUrl, reportData?.fileUrl.split('/').pop());
                }}
                variant="solid"
                className="md:w-full">
                Скачать
              </Button>
            )}
            <ReportModal
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
              mode="edit"
              report={reportData}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
