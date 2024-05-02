import { Card, Link, Image, Button, useDisclosure, Chip, User, Skeleton } from '@nextui-org/react';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import ReportModal from '../modal/ReportModal/ReportModal';
import { S3_URL } from '../../shared/config/constants';
import { saveAs } from 'file-saver';
import { reportStatusMap } from '../ReportsList/ReportsList';

export const ReportCard = ({ reportData, isLoading = false }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="my-6 md:my-10 p-5 sm:p-10 flex md:flex-row md:justify-around gap-5 md:gap-10">
      <div className="max-w-xl self-center">
        <Image alt="NextUI hero Image" src={reportData?.thumbUrl} />
      </div>
      <div className="flex flex-col justify-around gap-5">
        <div className="flex flex-col gap-4 min-w-[200px] md:min-w-[300px]">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[110px]">Конференция</span>
            {/* <div className="text-default-500 text-small">ФИТР</div> */}
            <Link
              isBlock
              href={`/conferences/${reportData?.conference?._id}`}
              color="foreground"
              className="text-default-500 text-small -ml-2">
              {reportData?.conference?.title}
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[110px]">Состояние</span>
            <Chip
              color={reportStatusMap[reportData?.status]?.color}
              className="-ml-1"
              variant="flat">
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                {reportStatusMap[reportData?.status]?.name || 'default'}
              </Skeleton>
            </Chip>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[110px]">Дата подачи</span>
            <div className="text-default-500 text-small">
              {formatToClientDate(reportData?.createdAt)}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[110px]">Автор</span>
            <Link
              isBlock
              href={'/users/' + reportData?.author?._id}
              color="foreground"
              className="text-default-500 text-small -ml-2">
              <User
                name={reportData?.author?.first_name + ' ' + reportData?.author?.last_name}
                description={reportData?.author?.position}
                avatarProps={{
                  src: S3_URL + reportData?.author?.avatarUrl,
                }}
              />
            </Link>
          </div>
          {reportData?.supervisor && (
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-[110px]">Научный руководитель</span>
              <Link
                isBlock
                href="/news"
                color="foreground"
                className="text-default-500 text-small -ml-2">
                <User
                  name={
                    reportData?.supervisor?.first_name + ' ' + reportData?.supervisor?.last_name
                  }
                  description={reportData?.supervisor?.position}
                  avatarProps={{
                    src: S3_URL + reportData?.supervisor?.avatarUrl,
                  }}
                />
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
    </Card>
  );
};
