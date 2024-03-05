import { Card, CardBody, Link, Image, Divider, Button } from '@nextui-org/react';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';

export const ProfileCard = ({ user }) => {
  return (
    <Card className="min-h-[250px] px-5">
      <CardBody className="flex md:flex-row gap-5 pt-5 items-center md:items-stretch">
        <div>
          <Image
            width={250}
            height={250}
            shadow="sm"
            alt="Avatar"
            src={user.avatar}
            className="aspect-square object-cover"
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-center flex-col gap-3 md:flex-row">
            <div>
              <h1 className="inline mb-5 font-bold text-3xl">{user.name}</h1>
              <p className="font-normal w-full text-default-600">{user.description}</p>
              <p className="font-normal w-full text-default-600">{user.email}</p>
              <time className="block text-small text-default-500" dateTime={user.date}>
                Дата регистрации: {formatToClientDate(user.date)}
              </time>
            </div>
            <Button
              href="/settings"
              as={Link}
              color="primary"
              variant="solid"
              className="min-w-[200px] md:w-40">
              Настройки
            </Button>
          </div>
          <Divider className="mt-3" />
          <div className="grow flex items-center">
            <div className="flex flex-col w-full justify-around gap-5 md:flex-row py-3">
              <div className="flex flex-col gap-1 items-center">
                <div>Участие в конференциях</div>
                <Link className="text-xl font-bold" href="/conferences?user=id">
                  10
                </Link>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div>Количество публикаций</div>
                <Link className="text-xl font-bold" href="/conferences?user=id">
                  10
                </Link>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div>Психологический возраст</div>
                <div className="text-xl font-bold">10</div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
