import { Button, Card, CardBody, useDisclosure } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useChangePasswordMutation } from '../../redux/services/authApi';
import { getErrorField } from '../../shared/utils/getErrorField';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Input } from '../Input/Input';
import DeleteAccountModal from '../modal/DeleteAccountModal/DeleteAccountModal';

const ManageAccount = () => {
  const [changePassword, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation();
  const [errorOnSubmit, setErrorOnSubmit] = useState('');
  const { handleSubmit, control, watch, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        currentPassword: '',
        newPassword: '',
        repeatPassword: '',
      }),
      [],
    ),
  });

  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onOpenChange: onOpenChangeModalDelete,
  } = useDisclosure();

  const onSubmitData = async (data) => {
    try {
      await changePassword(data).unwrap();
      setErrorOnSubmit('');
      reset();
      toast.success('Данные обновлены');
    } catch (err) {
      console.log(err);
      toast.error(getErrorField(err));
      // if (getErrorField(err)) {
      //   setErrorOnSubmit(err?.data?.message || err?.error);
      // }
    }
  };

  return (
    <>
      <Card className="px-5 py-3">
        <CardBody className="flex flex-col sm:flex-row gap-5 sm:gap-10 items-center justify-center md:items-start">
          <form onSubmit={handleSubmit(onSubmitData)} className="w-full md:w-auto">
            <h4 className="mb-5 font-bold text-large">Смена пароля</h4>
            <div className="inline-flex flex-col gap-5 w-full md:w-[300px]">
              <Input
                control={control}
                name="currentPassword"
                label="Текущий пароль"
                type="password"
                variant="bordered"
                rules={{
                  required: 'Обязательное поле',
                }}
              />
              <Input
                control={control}
                name="newPassword"
                label="Новый пароль"
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
                    if (watch('newPassword') != val) {
                      return 'Пароли не совпадают';
                    }
                  },
                }}
              />
              <ErrorMessage error={errorOnSubmit} />
              <Button
                color="primary"
                type="submit"
                className="w-full max-w-[300px]"
                isLoading={isChangePasswordLoading}
                // disabled={!isFormValid}
              >
                Сохранить
              </Button>
            </div>
          </form>
          <div className="w-full md:w-auto">
            <h4 className="mb-5 font-bold text-large">Удаление аккаунта</h4>
            <div className="inline-flex flex-col gap-5 w-full md:w-[300px] items-center">
              <Button
                color="danger"
                type="submit"
                variant="flat"
                className="w-full max-w-[300px]"
                onPress={() => {
                  onOpenModalDelete();
                }}>
                Удалить
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <DeleteAccountModal
        isOpen={isOpenModalDelete}
        onOpen={onOpenModalDelete}
        onOpenChange={onOpenChangeModalDelete}
      />
    </>
  );
};

export default ManageAccount;
