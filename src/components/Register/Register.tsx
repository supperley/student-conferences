import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/react';
import { useRegisterMutation } from '../../app/services/userApi';
import { useState } from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Input } from '../Input/Input';
import { hasErrorField } from '../../shared/utils/hasErrorField';

type Register = {
  email: string;
  name: string;
  password: string;
};

type Props = {
  setSelected: (value: string) => void;
};

const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const [register] = useRegisterMutation();
  const [error, setError] = useState('');

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap();
      setSelected('login');
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        required="Обязательное поле"
        label="Имя"
        name="name"
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
      <ErrorMessage error={error} />
      <Button size="lg" variant="shadow" className="font-bold" color="primary" type="submit">
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default Register;
