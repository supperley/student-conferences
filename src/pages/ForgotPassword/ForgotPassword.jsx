import { Card, CardBody } from '@nextui-org/react';
import ForgotPasswordCard from '../../components/ForgotPasswordCard/ForgotPasswordCard';

const ForgotPassword = () => {
  return (
    <>
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col">
          <Card className="max-w-full w-[340px]">
            <CardBody className="overflow-hidden">
              <ForgotPasswordCard></ForgotPasswordCard>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
