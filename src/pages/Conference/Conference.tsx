import { useNavigate, useParams } from 'react-router-dom';
import { conferences } from '../../shared/data/mockData';
import { Button, Card, Chip, Image, Link, User, useDisclosure } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import ApplyFormModal from '../../components/ApplyFormModal/ApplyFormModal';

const Conference = () => {
  const navigate = useNavigate();
  const params = useParams();
  const conferenceId = params.conferenceId;
  const conferenceData = conferences[conferenceId - 1];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      <h1 className="mb-10 font-bold text-4xl">{conferenceData.title}</h1>
      <Card className="my-10 p-5 sm:p-10 flex md:flex-row md:justify-around gap-5 md:gap-10">
        <div className="max-w-xl self-center">
          <Image alt="NextUI hero Image" src={conferenceData.image} />
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
                Проводится
              </Chip>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="w-[110px]">Дата</span>
              <div className="text-default-500 text-small">
                {formatToClientDate(conferenceData.date)}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
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
          <div className="flex flex-col md:flex-row md:items-center">
            <Button onPress={onOpen} color="primary" variant="solid" className="md:w-full">
              Подать заявку
            </Button>
            <ApplyFormModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
          </div>
        </div>
      </Card>

      <div>{conferenceData.description}</div>
    </div>
  );
};

export default Conference;
