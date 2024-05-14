import { Card, CardBody, CardHeader } from '@nextui-org/react';
import ForgotPasswordCard from '../../components/ForgotPasswordCard/ForgotPasswordCard';

const ForgotPassword = () => {
  return (
    <>
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col">
          <Card className="max-w-full w-[340px]">
            <CardHeader className="flex-col gap-3 px-5 pt-5 text-center">
              <h1 className="font-bold text-large">Не удается войти?</h1>
              <div>
                Введите свой электронный адрес, и мы отправим вам ссылку для восстановления доступа
                к аккаунту.
              </div>
            </CardHeader>
            <CardBody className="overflow-hidden">
              <ForgotPasswordCard />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
