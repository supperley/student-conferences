import { Button, Card, CardBody, Image, Select, SelectItem } from '@nextui-org/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCurrentQuery, useLazyCurrentQuery } from '../../redux/services/authApi';
import { useUpdateUserMutation } from '../../redux/services/userApi';
import { CameraIcon } from '../../shared/assets/icons/CameraIcon';
import { S3_URL } from '../../shared/config/constants';
import { facultiesDataMap } from '../../shared/data/dataMap';
import { getErrorField } from '../../shared/utils/getErrorField';
import { Input } from '../Input/Input';

const PersonalSettings = () => {
  const { data: user } = useCurrentQuery();
  const [error, setError] = useState('');
  const submitRef = useRef(null);
  const uploaderRef = useRef(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const handleAvatarChange = () => {
    if (event.target.files !== null) {
      setSelectedAvatar(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (selectedAvatar) {
      submitRef.current.click();
    }
  }, [selectedAvatar]);

  const { handleSubmit, register, control, setValue } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        _id: '',
        first_name: '',
        last_name: '',
        patronymic: '',
        email: '',
        faculty: '',
        position: '',
        avatar: '',
      }),
      [user],
    ),
  });

  useEffect(() => {
    setValue('_id', user?._id);
    setValue('first_name', user?.first_name);
    setValue('last_name', user?.last_name);
    setValue('email', user?.email);
    setValue('faculty', [user?.faculty]);
    setValue('position', user?.position);
  }, [user]);

  const onSubmitAvatar = async (data) => {
    try {
      const formData = new FormData();
      selectedAvatar && formData.append('avatar', selectedAvatar);
      await updateUser({ id: data._id, userData: formData }).unwrap();
      setSelectedAvatar(null);
      uploaderRef.current.value = null;
      await triggerCurrentQuery();
    } catch (err) {
      console.log(err);
      if (getErrorField(err)) {
        toast.error(getErrorField(err));
      } else {
        toast.error(JSON.stringify(err));
      }
      // if (getErrorField(err)) {
      //   setError(err?.data?.message || err?.error);
      // }
    }
  };

  const onSubmitData = async (data) => {
    try {
      const formData = new FormData();
      data.first_name && formData.append('first_name', data.first_name);
      data.last_name && formData.append('last_name', data.last_name);
      data.patronymic && formData.append('patronymic', data.patronymic);
      data.email && formData.append('email', data.email);
      data.faculty && [...data.faculty][0] && formData.append('faculty', [...data.faculty][0]);
      data.position && formData.append('position', data.position);
      selectedAvatar && formData.append('avatar', selectedAvatar);

      await updateUser({ id: data._id, userData: formData }).unwrap();
      setSelectedAvatar(null);
      uploaderRef.current.value = null;
      await triggerCurrentQuery();
      toast.success('Данные обновлены');
    } catch (err) {
      console.log(err);
      if (getErrorField(err)) {
        toast.error(getErrorField(err));
      } else {
        toast.error(JSON.stringify(err));
      }
      // if (getErrorField(err)) {
      //   setError(err?.data?.message || err?.error);
      // }
    }
  };

  return (
    <Card className="px-5 py-3">
      {/* <CardHeader>
          <h4 className="font-bold text-large">Настройки</h4>
        </CardHeader> */}
      <CardBody className="flex flex-col sm:flex-row gap-5 sm:gap-10 items-center md:items-start justify-evenly">
        <form onSubmit={handleSubmit(onSubmitAvatar)}>
          <div className="flex flex-col gap-3 min-w-[200px] sm:min-w-[235px]">
            <Image
              width={235}
              // height={235}
              shadow="sm"
              alt="Avatar"
              src={S3_URL + user?.avatarUrl}
              // src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              className="aspect-square object-cover"
            />
            <input
              ref={uploaderRef}
              type="file"
              accept="image/*"
              onChange={() => {
                handleAvatarChange();
              }}
              className="hidden"
            />
            <button ref={submitRef} type="submit" className="hidden"></button>
            <Button
              color="primary"
              startContent={<CameraIcon />}
              onClick={() => {
                uploaderRef.current.click();
              }}>
              Загрузить фото
            </Button>
            <Button
              color="danger"
              variant="bordered"
              onClick={() => {
                setSelectedAvatar('delete');
              }}>
              Удалить фото
            </Button>
          </div>
        </form>
        <form onSubmit={handleSubmit(onSubmitData)} className="w-full md:w-auto">
          <div className="inline-flex flex-col md:flex-row flex-wrap gap-5 w-full md:max-w-[650px] items-center justify-center">
            <Input
              className="max-w-[300px]"
              control={control}
              name="last_name"
              label="Фамилия"
              variant="bordered"
              rules={{
                required: 'Обязательное поле',
              }}
            />
            <Input
              className="max-w-[300px]"
              control={control}
              name="first_name"
              label="Имя"
              variant="bordered"
              rules={{
                required: 'Обязательное поле',
              }}
            />
            <Input
              className="max-w-[300px]"
              control={control}
              name="patronymic"
              label="Отчество"
              variant="bordered"
            />
            <Input
              className="max-w-[300px]"
              control={control}
              name="email"
              label="Электронная почта"
              type="email"
              variant="bordered"
              rules={{
                required: 'Обязательное поле',
              }}
            />
            <Controller
              control={control}
              name="faculty"
              render={({
                field: { onChange: onChangeFaculty, onBlur, value: facultyValue, ref },
              }) => (
                <Select
                  className="max-w-[300px]"
                  label="Факультет"
                  variant="bordered"
                  selectedKeys={facultyValue}
                  onSelectionChange={onChangeFaculty}>
                  {Object.values(facultiesDataMap).map((faculty) => (
                    <SelectItem key={faculty.value} value={faculty.value}>
                      {faculty.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            <Input
              className="max-w-[300px]"
              control={control}
              name="position"
              label="Должность"
              variant="bordered"
            />
            <Button
              color="primary"
              type="submit"
              className="w-full max-w-[300px]"
              isLoading={isUpdateLoading}>
              Сохранить
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default PersonalSettings;
