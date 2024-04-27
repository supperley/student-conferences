import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
  Avatar,
} from '@nextui-org/react';
import { UploadIcon } from '../../../shared/assets/icons/UploadIcon';
import { faculties } from '../../../shared/data/mockData';
import { S3_URL } from '../../../shared/config/constants';
import { useCreateConferenceMutation } from '../../../redux/services/conferenceApi';
import { hasErrorField } from '../../../shared/utils/hasErrorField';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import { useGetAllUsersQuery } from '../../../redux/services/userApi';
import { DevTool } from '@hookform/devtools';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';

const AddConferenceModal = ({ isOpen, onOpen, onOpenChange }) => {
  const { handleSubmit, register, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      date: parseAbsoluteToLocal('2024-05-05T11:00:00Z'),
      administrator: '',
      faculties: new Set([]),
      link: '',
      image: '',
    },
  });

  const { data: users, error: usersError, isLoading: isUsersLoading } = useGetAllUsersQuery();
  const [createConference, { isLoading }] = useCreateConferenceMutation();
  const [error, setError] = useState('');
  const uploaderRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleImageChange = () => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

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
              data.status && formData.append('status', Array.from(data.status));
              data.faculties && formData.append('faculties', Array.from(data.faculties));
              data.link && formData.append('link', data.link);
              selectedFile && formData.append('image', selectedFile);

              await createConference(formData).unwrap();
              onClose();
            } catch (err) {
              console.log(err);
              if (hasErrorField(err)) {
                setError(err?.data?.message || err?.error);
              }
            }
          };

          return (
            <>
              <ModalHeader className="flex flex-col gap-1">Добавление конференции</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    name="title"
                    label="Название конференции"
                    {...register('title')}
                    variant="bordered"
                    isRequired
                    errorMessage="Обязательное поле"
                  />
                  <Textarea
                    name="description"
                    label="Дополнительная информация"
                    {...register('description')}
                    variant="bordered"
                  />
                  <Select
                    isRequired
                    errorMessage="Обязательное поле"
                    name="administrator"
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
                        <div key={item._id} className="flex items-center gap-2">
                          <Avatar
                            alt={item.data.first_name + ' ' + item.data.last_name}
                            className="flex-shrink-0"
                            size="sm"
                            src={item.data.avatarUrl}
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
                  <Input
                    name="link"
                    type="url"
                    label="Ссылка на трансляцию"
                    {...register('link')}
                    variant="bordered"
                  />
                  {/* <Input
                    name="imageUrl"
                    type="file"
                    label="Загрузить изображение"
                    variant="bordered"
                  /> */}
                  <input
                    ref={uploaderRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    startContent={!selectedFile?.name && <UploadIcon />}
                    onClick={() => uploaderRef.current.click()}
                    variant="flat">
                    {selectedFile?.name || 'Загрузить изображение'}
                  </Button>
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
                    <Button color="primary" type="submit">
                      Сохранить
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

export default AddConferenceModal;
