import { Button, Card, CardBody, CardHeader, Image, Input } from '@nextui-org/react';
import { CameraIcon } from '../../shared/assets/icons/CameraIcon';

const Settings = () => {
  return (
    <div className="mt-10">
      <Card className="h-[500px] px-5 py-3">
        <CardHeader>
          <h4 className="font-bold text-large">Настройки</h4>
        </CardHeader>
        <CardBody className="flex flex-row gap-5 justify-between">
          <div className="flex flex-row gap-10 grow">
            <div className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-5 grow max-w-xs">
              <Input
                type="name"
                label="Фамилия"
                variant="bordered"
                defaultValue="Ivanov"
                className="max-w-xs"
              />
              <Input
                type="name"
                label="Имя"
                variant="bordered"
                defaultValue="Ivan"
                className="max-w-xs"
              />
              <Input
                type="name"
                label="Отчество"
                variant="bordered"
                defaultValue="Ivanovich"
                className="max-w-xs"
              />
              <Input
                type="email"
                label="Email"
                variant="bordered"
                defaultValue="junior@nextui.org"
                className="max-w-xs"
              />
              <Button color="primary">Сохранить</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Settings;
