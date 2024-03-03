import { Button, Input, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useLazyCurrentQuery, useLoginMutation } from '../../app/services/userApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../shared/utils/hasErrorField';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await login(data).unwrap();
      await triggerCurrentQuery();
      navigate('/');
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Имя пользователя"
        variant="bordered"
        {...register('login')}
        // helperText={errors?.login?.message}
        // status={errors?.login ? 'error' : 'primary'}
      />
      <Input
        label="Пароль"
        variant="bordered"
        type="password"
        {...register('password')}
        // helperText={errors?.password?.message}
        // status={errors?.password ? 'error' : 'primary'}
      />
      <Link className="justify-end" href="/forgot-password">
        Забыли пароль?
      </Link>
      <Button size="lg" type="submit" color="primary" variant="shadow" className="font-bold">
        Войти
      </Button>
    </form>
  );
};

export default Login;
