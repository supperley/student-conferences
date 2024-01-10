import { Button, Card, Input, Link } from '@nextui-org/react';

const Login = () => {
  const handleSubmit = () => {
    return;
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-20">
        <form onSubmit={handleSubmit()} noValidate>
          <Card className="flex flex-col p-16 max-w-[680px] min-w-[500px]">
            <div className="text-center font-bold text-xl mb-6">Login</div>
            <Input
              className="mb-4"
              label="Username"
              variant="bordered"
              // {...register('loginName')}
              // helperText={errors?.loginName?.message}
              // status={errors?.loginName ? 'error' : 'primary'}
            />
            <Input
              className="mb-6"
              label="Password"
              variant="bordered"
              // {...register('password')}
              // helperText={errors?.password?.message}
              // status={errors?.password ? 'error' : 'primary'}
            />
            <Link className="mb-6 justify-end" href="/forgot-password">
              Forgot Password ?
            </Link>
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              className="font-bold mb-6"
              disabled>
              Login
            </Button>
            <div className="text-center">
              Don't have account? <Link href="/register">Create new account</Link>
            </div>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Login;
