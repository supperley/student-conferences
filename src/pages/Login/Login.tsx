import { Button, Card, Input, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   await login(data).unwrap();
    //   await triggerCurrentQuery();
    //   navigate('/');
    // } catch (err) {
    //   if (hasErrorField(err)) {
    //     setError(err.data.error);
    //   }
    // }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-20">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Card className="flex flex-col p-16 max-w-[500px] min-w-[350px]">
            <div className="text-center font-bold text-xl mb-6">Login</div>
            <Input
              className="mb-4"
              label="Username"
              variant="bordered"
              {...register('login')}
              // helperText={errors?.login?.message}
              // status={errors?.login ? 'error' : 'primary'}
            />
            <Input
              className="mb-6"
              label="Password"
              variant="bordered"
              type="password"
              {...register('password')}
              // helperText={errors?.password?.message}
              // status={errors?.password ? 'error' : 'primary'}
            />
            <Link className="mb-6 justify-end" href="/forgot-password">
              Forgot Password ?
            </Link>
            <Button
              size="lg"
              type="submit"
              color="primary"
              variant="shadow"
              className="font-bold mb-6">
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
