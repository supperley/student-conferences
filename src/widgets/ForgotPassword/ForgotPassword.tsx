import { Button, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useLazyCurrentQuery, useLoginMutation } from '../../app/services/userApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../shared/utils/hasErrorField';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Input } from '../../components/Input/Input';

const ForgotPasswordCard = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

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
        control={control}
        name="email"
        label="Email"
        variant="bordered"
        type="email"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <Button size="lg" type="submit" color="primary" className="font-bold" variant="shadow">
        Восстановить пароль
      </Button>
      <Link className="justify-center my-2" href="/login">
        Назад
      </Link>
    </form>
  );
};

export default ForgotPasswordCard;
