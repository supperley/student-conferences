import { Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '../../components/Input/Input';
import { useResetPasswordMutation } from '../../redux/services/authApi';

const ResetPasswordCard = ({ token }) => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      password: '',
      password_repeat: '',
      token,
    },
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    data.token = token;
    console.log(data);
    if (data.password === data.password_repeat) {
      try {
        const result = await resetPassword(data).unwrap();
        setMessage(result?.message);
      } catch (err) {
        toast(JSON.stringify(err));
      }
    } else {
      toast.error('Пароли не совпадают');
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="password"
        label="Новый пароль"
        type="password"
        variant="bordered"
      />
      <Input
        control={control}
        name="password_repeat"
        label="Повторите пароль"
        type="password"
        variant="bordered"
      />
      {message && (
        <>
          <div className="bg-neutral-100 rounded-md px-4 py-2">{message}</div>
          <Link className="justify-center my-2" href="/login">
            Войти
          </Link>
        </>
      )}
      {!message && (
        <Button
          size="lg"
          type="submit"
          color="primary"
          className="font-bold my-2"
          variant="shadow"
          isLoading={isLoading}>
          Изменить пароль
        </Button>
      )}
    </form>
  );
};

export default ResetPasswordCard;
