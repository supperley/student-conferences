import { Button, Input, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useLazyCurrentQuery, useLoginMutation } from '../../app/services/userApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../shared/utils/hasErrorField';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

const ForgotPasswordCard = () => {
  const { register, handleSubmit } = useForm();

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
        label="Email"
        variant="bordered"
        {...register('email')}
        // helperText={errors?.login?.message}
        // status={errors?.login ? 'error' : 'primary'}
      />
      <ErrorMessage error={error} />
      <Button size="lg" type="submit" color="primary" className="font-bold">
        Восстановить пароль
      </Button>
    </form>
  );
};

export default ForgotPasswordCard;
