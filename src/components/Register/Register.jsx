import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Input } from '../../components/Input/Input';
import { useRegisterMutation } from '../../redux/services/authApi';
import { hasErrorField } from '../../shared/utils/hasErrorField';

const Register = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      login: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      await register(data).unwrap();
      setSelected('login');
      toast.success('Вы успешно зарегистрированы!');
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
        required="Обязательное поле"
        label="Логин"
        name="login"
        variant="bordered"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
        variant="bordered"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
        variant="bordered"
      />
      <Input
        control={control}
        name="first_name"
        label="Имя"
        required="Обязательное поле"
        variant="bordered"
      />
      <Input
        control={control}
        name="last_name"
        label="Фамилия"
        required="Обязательное поле"
        variant="bordered"
      />
      <ErrorMessage error={error} />
      <Button
        size="lg"
        variant="shadow"
        className="font-bold"
        color="primary"
        type="submit"
        isLoading={isLoading}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default Register;
