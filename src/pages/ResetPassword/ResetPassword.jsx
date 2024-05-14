import { Card, CardBody } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';
import ResetPasswordCard from '../../components/ResetPasswordCard/ResetPasswordCard';

const ResetPassword = () => {
  const [queryParameters] = useSearchParams();

  return (
    <>
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col">
          <Card className="max-w-full w-[340px]">
            <CardBody className="overflow-hidden">
              <ResetPasswordCard token={queryParameters.get('token')} />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
