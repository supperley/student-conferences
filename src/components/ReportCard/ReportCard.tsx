import { Card, Link, Image, Button, useDisclosure, Chip, User } from '@nextui-org/react';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import ApplyFormModal from '../ApplyFormModal/ApplyFormModal';

export const ReportCard = ({ reportData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="my-10 p-5 sm:p-10 flex md:flex-row md:justify-around gap-5 md:gap-10">
      <div className="max-w-xl self-center">
        <Image alt="NextUI hero Image" src={reportData.thumb} />
      </div>
      <div className="flex flex-col justify-around gap-5">
        <div className="flex flex-col gap-4 min-w-[200px] md:min-w-[300px]">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[110px]">Факультет</span>
            <div className="text-default-500 text-small">ФИТР</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[110px]">Состояние</span>
            <Chip color="success" className="-ml-1">
              Принят
            </Chip>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[110px]">Дата подачи</span>
            <div className="text-default-500 text-small">{formatToClientDate(reportData.date)}</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[110px]">Автор</span>
            <Link
              isBlock
              href="/news"
              color="foreground"
              className="text-default-500 text-small -ml-2">
              <User
                name={reportData.author.name}
                description="Product Designer"
                avatarProps={{
                  src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                }}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-center">
          <Button onPress={onOpen} color="primary" variant="solid" className="md:w-full">
            Редактировать
          </Button>
          {reportData?.link && (
            <Button
              as={Link}
              href={reportData.link}
              color="secondary"
              variant="solid"
              className="md:w-full">
              Скачать
            </Button>
          )}

          <ApplyFormModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
        </div>
      </div>
    </Card>
  );
};
