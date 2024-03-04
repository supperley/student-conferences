import { useParams } from 'react-router-dom';
import { conferences } from '../../shared/data/mockData';
import { Card, Chip, Image, Link, User } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import { ROUTE_CONSTANTS } from '../../shared/config/routes';

const Conference = () => {
  const params = useParams();
  const conferenceId = params.conferenceId;
  const conferenceData = conferences[conferenceId - 1];

  return (
    <div className="w-full lg:px-16 my-10">
      <div>
        <Link
          isBlock
          href={ROUTE_CONSTANTS.CONFERENCES}
          color="foreground"
          className="text-default-500 text-small mb-5 -ml-3">
          <ArrowIcon />
          Вернуться назад
        </Link>
      </div>
      <h1 className="mb-10 font-bold text-4xl">{conferenceData.title}</h1>
      <Card className="my-10 p-5 sm:p-10 flex md:flex-row md:items-center gap-8">
        <div className="md:w-6/12">
          <Image alt="NextUI hero Image" src={conferenceData.image} />
        </div>
        <div className="md:w-6/12 grow flex md:justify-center">
          <div className="md:pl-10 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:w-[350px] md:items-center gap-2">
              <span className="w-[110px]">Факультет</span>
              <div className="text-default-500 text-small">ФИТР</div>
            </div>
            <div className="flex flex-col md:flex-row md:w-[350px] md:items-center gap-2">
              <span className="w-[110px]">Состояние</span>
              <Chip color="success" className="-ml-1">
                Проводится
              </Chip>
            </div>
            <div className="flex flex-col md:flex-row md:w-[350px] md:items-center gap-2">
              <span className="w-[110px]">Дата</span>
              <div className="text-default-500 text-small">
                {formatToClientDate(conferenceData.date)}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:w-[350px] md:items-center gap-2">
              <span className="w-[110px]">Автор</span>
              <Link
                isBlock
                href="/news"
                color="foreground"
                className="text-default-500 text-small -ml-2">
                <User
                  name={conferenceData.author}
                  description="Product Designer"
                  avatarProps={{
                    src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <div>{conferenceData.description}</div>
    </div>
  );
};

export default Conference;
