import { Button, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input/Input';
import { useLazyCurrentQuery, useLoginMutation } from '../../redux/services/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../shared/utils/hasErrorField';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { toast } from 'sonner';

const Login = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();
      // await triggerCurrentQuery();
      navigate('/');
    } catch (err) {
      console.log(err);
      toast(JSON.stringify(err));
      if (hasErrorField(err)) {
        setError(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Электронная почта"
        variant="bordered"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        variant="bordered"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
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
