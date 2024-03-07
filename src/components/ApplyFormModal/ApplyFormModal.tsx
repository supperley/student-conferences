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
} from '@nextui-org/react';
import { UploadIcon } from '../../shared/assets/icons/UploadIcon';
import { users } from '../../shared/data/mockData';

const ApplyFormModal = ({ isOpen, onOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Подать заявку</ModalHeader>
            <ModalBody>
              <Input label="Тема научной работы" variant="bordered" required />
              <Select label="Научный руководитель" variant="bordered">
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </Select>
              <Input label="Дополнительная информация" variant="bordered" />
              {/* <Input type="file" label="Файл научной работы (.pdf)" variant="bordered" /> */}
              <Button color="primary" startContent={<UploadIcon />}>
                Загрузить файл
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
                  Отправить
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ApplyFormModal;
