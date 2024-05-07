import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Link,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
  Avatar,
} from '@nextui-org/react';
import { UploadIcon } from '../../../shared/assets/icons/UploadIcon';
import { faculties } from '../../../shared/data/dataMap';
import { S3_URL } from '../../../shared/config/constants';
import {
  useCreateConferenceMutation,
  useUpdateConferenceMutation,
} from '../../../redux/services/conferenceApi';
import { hasErrorField } from '../../../shared/utils/hasErrorField';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import { useGetAllUsersQuery } from '../../../redux/services/userApi';
import { DevTool } from '@hookform/devtools';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import { CheckIcon } from '../../../shared/assets/icons/CheckIcon';
import { toast } from 'sonner';

const ConferenceModal = ({ isOpen, onOpenChange, mode = 'add', conference = {} }) => {
  const { data: users, error: usersError, isLoading: isUsersLoading } = useGetAllUsersQuery();
  const [createConference, { isLoading: isCreateLoading }] = useCreateConferenceMutation();
  const [updateConference, { isLoading: isUpdateLoading }] = useUpdateConferenceMutation();
  const [error, setError] = useState('');
  const uploaderRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDeleteImage, setIsDeleteImage] = useState(false);
  const handleImageChange = () => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const { handleSubmit, register, control, setValue, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        title: '',
        description: '',
        date: parseAbsoluteToLocal('2024-05-05T11:00:00Z'),
        administrator: '',
        faculties: new Set([]),
        link: '',
        image: '',
      }),
      [conference],
    ),
  });

  useEffect(() => {
    getValues('_id') || setValue('_id', conference?._id);
    getValues('title') || setValue('title', conference?.title);
    getValues('description') || setValue('description', conference?.description);
    getValues('date') ||
      setValue('date', parseAbsoluteToLocal(conference?.date || '2024-05-05T11:00:00Z'));
    getValues('administrator') || setValue('administrator', conference?.administrator?._id);
    getValues('faculties')?.length > 0 || setValue('faculties', conference?.faculties);
    getValues('link') || setValue('link', conference?.link);
  }, [conference]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
      <ModalContent className="!my-3">
        {(onClose) => {
          const onSubmit = async (data) => {
            try {
              const formData = new FormData();
              data.title && formData.append('title', data.title);
              data.description && formData.append('description', data.description);
              data.date && formData.append('date', data.date.toDate());
              data.administrator && formData.append('administrator', data.administrator);
              data.status && formData.append('status', data.status);
              data.faculties &&
                Array.from(data.faculties).forEach((faculty) => {
                  formData.append('faculties', faculty);
                });
              data.link && formData.append('link', data.link);
              isDeleteImage && formData.append('image', 'delete');
              selectedFile && formData.append('image', selectedFile);

              if (mode === 'add') {
                await createConference(formData).unwrap();
              } else {
                await updateConference({ id: data._id, conferenceData: formData }).unwrap();
              }

              onClose();
              setSelectedFile(null);
            } catch (err) {
              console.log(err);
              toast(JSON.stringify(err));
              if (hasErrorField(err)) {
                setError(err?.data?.message || err?.error);
              }
            }
          };

          return (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {mode === 'add' ? 'Добавление' : 'Редактирование'} конференции
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange: onChangeTitle, value: titleValue } }) => (
                      <Input
                        label="Название конференции"
                        variant="bordered"
                        isRequired
                        errorMessage="Обязательное поле"
                        onChange={onChangeTitle}
                        value={titleValue}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="description"
                    render={({
                      field: { onChange: onChangeDescription, value: descriptionValue },
                    }) => (
                      <Textarea
                        label="Дополнительная информация"
                        onChange={onChangeDescription}
                        value={descriptionValue}
                        variant="bordered"
                      />
                    )}
                  />
                  <Select
                    isRequired
                    errorMessage="Обязательное поле"
                    label="Администратор конференции"
                    variant="bordered"
                    isLoading={isUsersLoading}
                    {...register('administrator')}
                    items={users || []}
                    classNames={{
                      label: 'group-data-[filled=true]:-translate-y-6',
                      trigger: 'min-h-20',
                    }}
                    renderValue={(items) => {
                      return items.map((item) => (
                        <div key={item.data._id} className="flex items-center gap-2">
                          <Avatar
                            alt={item.data.first_name + ' ' + item.data.last_name}
                            className="flex-shrink-0"
                            size="sm"
                            src={S3_URL + item.data.avatarUrl}
                          />
                          <div className="flex flex-col">
                            <span>{item.data.first_name + ' ' + item.data.last_name}</span>
                            <span className="text-default-500 text-tiny">({item.data.email})</span>
                          </div>
                        </div>
                      ));
                    }}>
                    {(user) => (
                      <SelectItem key={user._id} textValue={user.last_name}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            alt={user.first_name + ' ' + user.last_name}
                            className="flex-shrink-0"
                            size="sm"
                            src={S3_URL + user.avatarUrl}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">
                              {user.first_name + ' ' + user.last_name}
                            </span>
                            <span className="text-tiny text-default-400">{user.email}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  <Controller
                    control={control}
                    name="faculties"
                    render={({
                      field: { onChange: onChangeFaculties, onBlur, value: facultiesValue, ref },
                    }) => (
                      <Select
                        label="Факультеты"
                        selectionMode="multiple"
                        variant="bordered"
                        selectedKeys={facultiesValue}
                        onSelectionChange={onChangeFaculties}>
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
                    name="date"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <I18nProvider locale="ru-RU">
                        <DatePicker
                          label="Дата проведения"
                          variant="bordered"
                          granularity="minute"
                          onChange={onChange}
                          value={value}
                          showMonthAndYearPickers
                        />
                      </I18nProvider>
                    )}
                  />
                  <Controller
                    control={control}
                    name="link"
                    render={({ field: { onChange: onChangeLink, value: linkValue } }) => (
                      <Input
                        type="url"
                        label="Ссылка на трансляцию"
                        variant="bordered"
                        onChange={onChangeLink}
                        value={linkValue}
                      />
                    )}
                  />
                  <input
                    ref={uploaderRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex gap-5">
                    {mode === 'edit' && conference?.imageUrl && (
                      <Button
                        className="w-1/3"
                        startContent={isDeleteImage && <CheckIcon />}
                        onClick={() => {
                          setIsDeleteImage((prev) => !prev);
                        }}
                        variant="flat"
                        color={isDeleteImage ? 'danger' : 'default'}>
                        Удалить изображение
                      </Button>
                    )}
                    <Button
                      className={mode === 'edit' && conference?.imageUrl ? 'w-2/3' : 'w-full'}
                      startContent={!selectedFile?.name && <UploadIcon />}
                      onClick={() => uploaderRef.current.click()}
                      variant="flat">
                      {selectedFile?.name ||
                        `${mode === 'add' ? 'Загрузить' : 'Обновить'} изображение`}
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter className="justify-between items-center">
                  <Link color="primary" href="/help" size="sm">
                    Возникли вопросы?
                  </Link>
                  <ErrorMessage error={error} />
                  <div className="flex gap-2">
                    <Button variant="flat" onPress={onClose}>
                      Отменить
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      isLoading={mode === 'add' ? isCreateLoading : isUpdateLoading}>
                      {mode === 'add' ? 'Добавить' : 'Обновить'}
                    </Button>
                  </div>
                </ModalFooter>
              </form>
              {/* <DevTool control={control} /> */}
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default ConferenceModal;
