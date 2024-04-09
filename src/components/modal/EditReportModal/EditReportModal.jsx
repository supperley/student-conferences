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
import { users } from '../../../shared/data/mockData';

const EditReportModal = ({ isOpen, onOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Редактировать заявку</ModalHeader>
            <ModalBody>
              <Input label="Тема научной работы" variant="bordered" required />
              <Select label="Научный руководитель" variant="bordered">
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </Select>
              <Textarea label="Описание" variant="bordered" />
              {/* <Input type="file" label="Файл научной работы (.pdf)" variant="bordered" /> */}
              <Button color="primary" startContent={<UploadIcon />}>
                Заменить файл
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

export default EditReportModal;
