import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { CameraIcon } from '../../shared/assets/icons/CameraIcon';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { S3_URL } from '../../shared/config/constants';
import { Controller, useForm } from 'react-hook-form';
import { faculties } from '../../shared/data/mockData';
import { useEffect, useMemo, useRef, useState } from 'react';
import { hasErrorField } from '../../shared/utils/hasErrorField';
import { useUpdateUserMutation } from '../../redux/services/userApi';
import { useCurrentQuery, useLazyCurrentQuery } from '../../redux/services/authApi';
import { toast } from 'sonner';

const Settings = () => {
  // const user = useSelector(selectUser);
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
    setValue('faculty', user?.faculty);
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
      toast(JSON.stringify(err));
      if (hasErrorField(err)) {
        setError(err?.data?.message || err?.error);
      }
    }
  };

  const onSubmitData = async (data) => {
    try {
      const formData = new FormData();
      data.first_name && formData.append('first_name', data.first_name);
      data.last_name && formData.append('last_name', data.last_name);
      data.patronymic && formData.append('patronymic', data.patronymic);
      data.email && formData.append('email', data.email);
      data.faculty && formData.append('faculty', data.faculty);
      data.position && formData.append('position', data.position);
      selectedAvatar && formData.append('avatar', selectedAvatar);

      await updateUser({ id: data._id, userData: formData }).unwrap();
      setSelectedAvatar(null);
      uploaderRef.current.value = null;
      await triggerCurrentQuery();
    } catch (err) {
      console.log(err);
      toast(JSON.stringify(err));
      if (hasErrorField(err)) {
        setError(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <div className="my-10">
      <Card className="px-5 py-3">
        <CardHeader>
          <h4 className="font-bold text-large">Настройки</h4>
        </CardHeader>
        <CardBody className="flex flex-col sm:flex-row gap-5 sm:gap-10 items-center md:items-start justify-evenly">
          <form onSubmit={handleSubmit(onSubmitAvatar)}>
            <div className="flex flex-col gap-3 min-w-[200px] sm:min-w-[250px]">
              <Image
                width={250}
                height={250}
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
          <form onSubmit={handleSubmit(onSubmitData)}>
            <div className="inline-flex flex-col md:flex-row flex-wrap gap-5 w-full md:max-w-[650px] items-center justify-center">
              <Controller
                control={control}
                name="last_name"
                render={({ field: { onChange: onChangeLastName, value: lastNameValue } }) => (
                  <Input
                    label="Фамилия"
                    variant="bordered"
                    className="max-w-[300px]"
                    onChange={onChangeLastName}
                    value={lastNameValue}
                  />
                )}
              />
              <Controller
                control={control}
                name="first_name"
                render={({ field: { onChange: onChangeFirstName, value: firstNameValue } }) => (
                  <Input
                    label="Имя"
                    variant="bordered"
                    className="max-w-[300px]"
                    onChange={onChangeFirstName}
                    value={firstNameValue}
                  />
                )}
              />
              <Controller
                control={control}
                name="patronymic"
                render={({ field: { onChange: onChangePatronymic, value: patronymicValue } }) => (
                  <Input
                    label="Отчество"
                    variant="bordered"
                    className="max-w-[300px]"
                    onChange={onChangePatronymic}
                    value={patronymicValue}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange: onChangeEmail, value: emailValue } }) => (
                  <Input
                    type="email"
                    label="Email"
                    variant="bordered"
                    className="max-w-[300px]"
                    onChange={onChangeEmail}
                    value={emailValue}
                  />
                )}
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
                    selectedKeys={[facultyValue]}
                    onSelectionChange={onChangeFaculty}>
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.value} value={faculty.value}>
                        {faculty.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                control={control}
                name="position"
                render={({ field: { onChange: onChangePosition, value: positionValue } }) => (
                  <Input
                    label="Должность"
                    variant="bordered"
                    className="max-w-[300px]"
                    onChange={onChangePosition}
                    value={positionValue}
                  />
                )}
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
    </div>
  );
};

export default Settings;
