import { Button, Card, Chip, Image, Link, Skeleton, User, useDisclosure } from '@nextui-org/react';
import defaultConference from '../../shared/assets/images/default-conference.jpg';
import { S3_URL } from '../../shared/config/constants';
import { conferenceStatusMap, facultiesDataMap } from '../../shared/data/dataMap';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import { formatToGoogleDate } from '../../shared/utils/formatToGoogleDate';
import ReportModal from '../modal/ReportModal/ReportModal';

export const ConferenceCard = ({ conferenceData, isLoading = false }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const createGoogleDate = () => {
    const startDate = new Date(conferenceData?.date);
    let endDate = new Date(conferenceData?.date);
    endDate.setHours(endDate.getHours() + 1);
    return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${
      conferenceData?.title
    }&dates=${formatToGoogleDate(startDate)}/${formatToGoogleDate(endDate)}&trp=false`;
  };

  return (
    <Card className="flex my-6 md:my-10 p-5 sm:p-10 md:flex-row md:justify-around gap-5 md:gap-10">
      <div className="lg:w-3/5 overflow-hidden flex justify-center items-center">
        <Skeleton isLoaded={!isLoading} className={`rounded-lg ${isLoading && 'w-80 h-64'}`}>
          <Image
            className="max-h-80"
            alt="NextUI hero Image"
            src={conferenceData?.imageUrl ? S3_URL + conferenceData?.imageUrl : defaultConference}
          />
        </Skeleton>
      </div>
      <div className="flex lg:w-2/5 md:justify-center">
        <div className="flex flex-col w-full md:w-auto gap-10 justify-around">
          <div className="flex flex-col gap-4 min-w-[200px] md:min-w-[300px]">
            {conferenceData?.faculties && conferenceData?.faculties?.length > 0 && (
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="w-[130px]">Факультеты</span>
                <div className="text-default-500 text-small">
                  <Skeleton isLoaded={!isLoading} className="rounded-lg">
                    {conferenceData?.faculties
                      ?.map((faculty) => {
                        return facultiesDataMap[faculty]?.label;
                      })
                      .join(', ')}
                  </Skeleton>
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-[130px]">Состояние</span>
              <Skeleton isLoaded={!isLoading} className="rounded-lg -ml-1">
                <Chip color={conferenceStatusMap[conferenceData?.status]?.color} variant="flat">
                  {conferenceStatusMap[conferenceData?.status]?.name || 'default'}
                </Chip>
              </Skeleton>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-[130px]">Дата</span>
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <div className="text-default-500 text-small">
                  {formatToClientDate(conferenceData?.date)}
                </div>
              </Skeleton>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-[130px]">Администратор</span>
              <Link
                isBlock
                href={'/users/' + conferenceData?.administrator?._id}
                color="foreground"
                className="text-default-500 text-small -ml-2">
                <Skeleton isLoaded={!isLoading} className="rounded-lg">
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
                </Skeleton>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:items-center">
            {conferenceData?.status === 'registrationOpen' && (
              <Button onPress={onOpen} color="primary" className="md:w-full">
                Подать заявку
              </Button>
            )}
            {(conferenceData?.status === 'registrationOpen' ||
              conferenceData?.status === 'registrationClosed') &&
              conferenceData?.link && (
                <Button
                  as={Link}
                  href={createGoogleDate(conferenceData?.date)}
                  target="_blank"
                  variant="flat"
                  className="md:w-full">
                  Добавить в Google Календарь
                </Button>
              )}
            {conferenceData?.status === 'held' && conferenceData?.link && (
              <Button
                as={Link}
                href={conferenceData?.link}
                color="secondary"
                variant="flat"
                target="_blank"
                className="md:w-full">
                Присоединится к трансляции
              </Button>
            )}
            <ReportModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
          </div>
        </div>
      </div>
    </Card>
  );
};
