import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Input } from '../../components/Input/Input';
import { useRegisterMutation } from '../../redux/services/authApi';
import { getErrorField } from '../../shared/utils/getErrorField';

const Register = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      // login: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const [errorOnSubmit, setErrorOnSubmit] = useState('');

  const onSubmit = async (data) => {
    try {
      await register(data).unwrap();
      setSelected('login');
      toast.success('Вы успешно зарегистрированы!');
    } catch (err) {
      console.log(err);
      if (getErrorField(err)) {
        toast.error(getErrorField(err));
      } else {
        toast.error(JSON.stringify(err));
      }
      // if (getErrorField(err)) {
      //   setErrorOnSubmit(err?.data?.message || err?.error);
      // }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* <Input
        control={control}
        label="Логин"
        name="login"
        variant="bordered"
        rules={{
          required: 'Обязательное поле',
        }}
      /> */}
      <Input
        control={control}
        name="email"
        label="Электронная почта"
        type="email"
        variant="bordered"
        rules={{
          required: 'Обязательное поле',
        }}
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        variant="bordered"
        rules={{
          required: 'Обязательное поле',
          minLength: {
            value: 4,
            message: 'Пароль должен содержать не менее 4 символов',
          },
          maxLength: {
            value: 64,
            message: 'Пароль должен содержать не более 64 символов',
          },
        }}
      />
      <Input
        control={control}
        name="repeatPassword"
        label="Повторите пароль"
        type="password"
        variant="bordered"
        rules={{
          required: 'Обязательное поле',
          minLength: {
            value: 4,
            message: 'Пароль должен содержать не менее 4 символов',
          },
          maxLength: {
            value: 64,
            message: 'Пароль должен содержать не более 64 символов',
          },
          validate: (val) => {
            if (watch('password') != val) {
              return 'Пароли не совпадают';
            }
          },
        }}
      />
      <Input
        control={control}
        name="first_name"
        label="Имя"
        variant="bordered"
        rules={{
          required: 'Обязательное поле',
        }}
      />
      <Input
        control={control}
        name="last_name"
        label="Фамилия"
        variant="bordered"
        rules={{
          required: 'Обязательное поле',
        }}
      />
      <ErrorMessage error={errorOnSubmit} />
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
