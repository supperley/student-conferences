import { Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '../../components/Input/Input';
import { useForgotPasswordMutation } from '../../redux/services/authApi';

const ForgotPasswordCard = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const result = await forgotPassword(data).unwrap();
      setMessage(result?.message);
    } catch (err) {
      toast(JSON.stringify(result));
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
        rules={{
          required: 'Обязательное поле',
        }}
      />
      {message && <div className="bg-neutral-100 rounded-md px-4 py-2">{message}</div>}
      {!message && (
        <Button
          size="lg"
          type="submit"
          color="primary"
          className="font-bold"
          variant="shadow"
          isLoading={isLoading}>
          Восстановить пароль
        </Button>
      )}
      <Link className="justify-center my-2" href="/login">
        Назад
      </Link>
    </form>
  );
};

export default ForgotPasswordCard;
