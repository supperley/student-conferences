import { Button, Card, CardBody, CardHeader, Image, Input } from '@nextui-org/react';
import { CameraIcon } from '../../shared/assets/icons/CameraIcon';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';

const Settings = () => {
  const user = useSelector(selectUser);

  return (
    <div className="my-10">
      <Card className="px-5 py-3">
        <CardHeader>
          <h4 className="font-bold text-large">Настройки</h4>
        </CardHeader>
        <CardBody className="flex flex-col sm:flex-row gap-5 sm:gap-10 items-center md:items-start justify-evenly">
          <div className="flex flex-col gap-3 min-w-[200px] sm:min-w-[250px]">
            <Image
              width={250}
              height={250}
              shadow="sm"
              alt="Avatar"
              src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              className="aspect-square object-cover"
            />
            <Button color="primary" startContent={<CameraIcon />}>
              Загрузить фото
            </Button>
            <Button color="danger" variant="bordered">
              Удалить фото
            </Button>
          </div>
          <div className="inline-flex flex-col md:flex-row flex-wrap gap-5 w-full md:max-w-[650px] items-center justify-center">
            <Input
              type="name"
              label="Фамилия"
              variant="bordered"
              defaultValue={user?.last_name}
              className="max-w-[300px]"
            />
            <Input
              type="name"
              label="Имя"
              variant="bordered"
              defaultValue={user?.first_name}
              className="max-w-[300px]"
            />
            <Input
              type="name"
              label="Отчество"
              variant="bordered"
              defaultValue={user?.patronymic}
              className="max-w-[300px]"
            />
            <Input
              type="email"
              label="Email"
              variant="bordered"
              defaultValue={user?.email}
              className="max-w-[300px]"
            />
            <Input
              type="department"
              label="Должность"
              variant="bordered"
              defaultValue={user?.department}
              className="max-w-[300px]"
            />
            <Input
              type="faculty"
              label="Факультет"
              variant="bordered"
              defaultValue={user?.faculty}
              className="max-w-[300px]"
            />
            <Button color="primary" className="w-full max-w-[300px]">
              Сохранить
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Settings;
