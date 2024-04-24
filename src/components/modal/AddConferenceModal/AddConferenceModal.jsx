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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import { useGetAllUsersQuery } from '../../../redux/services/userApi';
import { DevTool } from '@hookform/devtools';

const AddConferenceModal = ({ isOpen, onOpen, onOpenChange }) => {
  const { handleSubmit, register, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      date: '',
      administrator: '',
      faculty: [],
      link: '',
    },
  });

  const { data: users, error: usersError, isLoading: isUsersLoading } = useGetAllUsersQuery();
  const [createConference, { isLoading }] = useCreateConferenceMutation();
  const [error, setError] = useState('');

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
      <ModalContent className="!my-3">
        {(onClose) => {
          const onSubmit = async (data) => {
            try {
              console.log(data);
              await createConference(data).unwrap();
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
                    required
                  />
                  <Textarea
                    name="description"
                    label="Дополнительная информация"
                    {...register('description')}
                    variant="bordered"
                  />
                  <Select
                    name="administrator"
                    label="Администратор конференции"
                    variant="bordered"
                    isLoading={isUsersLoading}
                    {...register('administrator')}
                    items={users}
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
                  <Select
                    name="faculty"
                    label="Факультеты"
                    {...register('faculty')}
                    selectionMode="multiple"
                    variant="bordered">
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.value} value={faculty.value}>
                        {faculty.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <DatePicker
                    name="date"
                    label="Дата проведения"
                    {...register('date')}
                    variant="bordered"
                    showMonthAndYearPickers
                  />
                  <Input
                    name="link"
                    label="Ссылка на трансляцию"
                    {...register('link')}
                    variant="bordered"
                  />
                  {/* <Input name="imageUrl" type="file" label="Файл научной работы (.pdf)" variant="bordered" /> */}
                  <Button color="primary" startContent={<UploadIcon />}>
                    Загрузить изображение
                  </Button>
                  <Checkbox
                    required
                    classNames={{
                      label: 'text-small',
                    }}>
                    Согласен с политикой обработки персональных данных
                  </Checkbox>
                </ModalBody>
                <ModalFooter className="justify-between">
                  <ErrorMessage error={error} />
                  <Link color="primary" href="/help" size="sm">
                    Возникли вопросы?
                  </Link>
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
              <DevTool control={control} />
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default AddConferenceModal;
