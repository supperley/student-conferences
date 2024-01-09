import { Button, Card, Input } from '@nextui-org/react';

const Login = () => {
  const handleSubmit = () => {
    return;
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-40">
        <form onSubmit={handleSubmit()} noValidate>
          <Card className="flex flex-col p-16 max-w-[680px] min-w-[500px]">
            <div className="text-center font-bold text-xl mb-2">Login</div>
            <Input
              className="my-4"
              label="Username"
              // {...register('loginName')}
              // helperText={errors?.loginName?.message}
              // status={errors?.loginName ? 'error' : 'primary'}
            />
            <Input
              className="my-2"
              label="Password"
              // {...register('password')}
              // helperText={errors?.password?.message}
              // status={errors?.password ? 'error' : 'primary'}
            />
            <Button type="submit" color="primary" className="mt-4" disabled>
              Login
            </Button>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Login;
