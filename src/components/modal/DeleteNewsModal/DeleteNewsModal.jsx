import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React from 'react';
import { useDeleteNewsMutation } from '../../../redux/services/newsApi';

const DeleteNewsModal = ({ isOpen, onOpenChange, news }) => {
  const [deleteNews, { isLoading: isDeleteLoading }] = useDeleteNewsMutation();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Подтвердите действие</ModalHeader>
            <ModalBody>
              <p>Вы действительно хотите удалить данную новость?</p>
              <p>Это действие нельзя отменить.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Отменить
              </Button>
              <Button
                isLoading={isDeleteLoading}
                color="danger"
                onPress={async () => {
                  await deleteNews(news._id);
                  onClose();
                }}>
                Удалить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteNewsModal;
