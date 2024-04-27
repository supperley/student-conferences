import { Card, Link, Image, Button, useDisclosure, Chip, User } from '@nextui-org/react';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import AddReportModal from '../modal/AddReportModal/AddReportModal';
import { S3_URL } from '../../shared/config/constants';
import { conferenceStatusMap } from '../../shared/data/dataMap';
import { faculties } from '../../shared/data/mockData';

export const ConferenceCard = ({ conferenceData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="my-10 p-5 sm:p-10 flex md:flex-row md:justify-around gap-5 md:gap-10">
      <div className="max-w-xl overflow-hidden self-center">
        <Image
          className="max-h-72"
          alt="NextUI hero Image"
          src={S3_URL + conferenceData?.imageUrl}
        />
      </div>
      <div className="flex flex-col justify-around gap-5">
        <div className="flex flex-col gap-4 min-w-[200px] md:min-w-[300px]">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[130px]">Факультеты</span>
            <div className="text-default-500 text-small">
              {conferenceData?.faculties.map((faculty) => {
                return faculties.find((o) => o.value === faculty)?.label;
              })}
            </div>
          </div>
          {/* <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[130px]">Кафедра</span>
            <div className="text-default-500 text-small">{conferenceData?.department}</div>
          </div> */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[130px]">Состояние</span>
            <Chip
              color={conferenceStatusMap[conferenceData?.status]?.color}
              className="-ml-1"
              variant="flat">
              {conferenceStatusMap[conferenceData?.status]?.name || cellValue}
            </Chip>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[130px]">Дата</span>
            <div className="text-default-500 text-small">
              {formatToClientDate(conferenceData?.date)}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-[130px]">Администратор</span>
            <Link
              isBlock
              href="/news"
              color="foreground"
              className="text-default-500 text-small -ml-2">
              <User
                name={
                  conferenceData?.administrator?.first_name +
                  ' ' +
                  conferenceData?.administrator?.last_name
                }
                description="Product Designer"
                avatarProps={{
                  src: S3_URL + conferenceData?.administrator?.avatarUrl,
                }}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-center">
          <Button onPress={onOpen} color="primary" className="md:w-full">
            Подать заявку
          </Button>
          {conferenceData?.status === 'registrationOpen' && conferenceData?.link && (
            <Button
              as={Link}
              href={conferenceData?.link}
              color="secondary"
              variant="flat"
              className="md:w-full">
              Присоединится к трансляции
            </Button>
          )}

          <AddReportModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
        </div>
      </div>
    </Card>
  );
};
