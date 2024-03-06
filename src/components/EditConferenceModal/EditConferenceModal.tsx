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
} from '@nextui-org/react';
import { UploadIcon } from '../../shared/assets/icons/UploadIcon';

const EditConferenceModal = ({ isOpen, onOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Редактировать</ModalHeader>
            <ModalBody>
              <Input label="Название конференции" variant="bordered" required />
              <Input label="Дополнительная информация" variant="bordered" />
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

export default EditConferenceModal;
