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
} from '@nextui-org/react';
import { UploadIcon } from '../../../shared/assets/icons/UploadIcon';
import { faculties, users } from '../../../shared/data/mockData';

const EditConferenceModal = ({ isOpen, onOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
      <ModalContent className="!my-3">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Редактировать конференцию</ModalHeader>
            <ModalBody>
              <Input label="Название конференции" variant="bordered" required />
              <Textarea label="Дополнительная информация" variant="bordered" />
              <Select label="Администратор конференции" variant="bordered">
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </Select>
              <Select label="Факультеты" selectionMode="multiple" variant="bordered">
                {faculties.map((faculty) => (
                  <SelectItem key={faculty.value} value={faculty.value}>
                    {faculty.label}
                  </SelectItem>
                ))}
              </Select>
              <Input label="Дата проведения" variant="bordered" type="date" />
              <Input label="Ссылка на трансляцию" variant="bordered" />
              {/* <Input type="file" label="Файл научной работы (.pdf)" variant="bordered" /> */}
              <Button color="primary" startContent={<UploadIcon />}>
                Обновить изображение
              </Button>
            </ModalBody>
            <ModalFooter className="justify-end">
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

export default EditConferenceModal;
