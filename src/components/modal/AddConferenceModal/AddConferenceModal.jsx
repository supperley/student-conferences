import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
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
import { faculties, users } from '../../../shared/data/mockData';
import { S3_URL } from '../../../shared/config/constants';

const AddConferenceModal = ({ isOpen, onOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
      <ModalContent className="!my-3">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Добавление конференции</ModalHeader>
            <ModalBody>
              <Input label="Название конференции" variant="bordered" required />
              <Textarea label="Дополнительная информация" variant="bordered" />
              <Select
                label="Администратор конференции"
                variant="bordered"
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
                        <span className="text-small">{user.first_name + ' ' + user.last_name}</span>
                        <span className="text-tiny text-default-400">{user.email}</span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
              <Select label="Факультеты" selectionMode="multiple" variant="bordered">
                {faculties.map((faculty) => (
                  <SelectItem key={faculty.value} value={faculty.value}>
                    {faculty.label}
                  </SelectItem>
                ))}
              </Select>
              <DatePicker label="Дата проведения" variant="bordered" showMonthAndYearPickers />
              <Input label="Ссылка на трансляцию" variant="bordered" />
              {/* <Input type="file" label="Файл научной работы (.pdf)" variant="bordered" /> */}
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
              <Link color="primary" href="/help" size="sm">
                Возникли вопросы?
              </Link>
              <div className="flex gap-2">
                <Button variant="flat" onPress={onClose}>
                  Отменить
                </Button>
                <Button color="primary" onPress={onClose}>
                  Сохранить
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddConferenceModal;
