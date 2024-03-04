import { Card, CardBody, Link, Image, Divider, Button } from '@nextui-org/react';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';

export const ProfileCard = ({ profile }) => {
  return (
    <Card className="h-[250px] px-5">
      <CardBody className="flex flex-row gap-5 pt-5">
        <div>
          <Image
            width={250}
            height={250}
            shadow="sm"
            alt="Avatar"
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            className="aspect-square object-cover"
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="inline mb-5 font-bold text-3xl">{profile.title}</h1>
              <p className="font-normal w-full text-default-600">{profile.description}</p>
              <p className="font-normal w-full text-default-600">{profile.email}</p>
              <time className="block text-small text-default-500" dateTime={profile.date}>
                Дата регистрации: {formatToClientDate(profile.date)}
              </time>
            </div>
            <Button href="/settings" as={Link} color="primary" variant="solid">
              Настройки
            </Button>
          </div>
          <Divider className="mt-3" />
          <div className="grow flex items-center">
            <div className="flex w-full justify-around">
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