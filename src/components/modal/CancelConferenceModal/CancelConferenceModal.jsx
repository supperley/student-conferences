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

const CancelConferenceModal = ({ isOpen, onOpenChange, conference, onSubmitStatus, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Подтвердите действие</ModalHeader>
            <ModalBody>
              <p>Вы действительно хотите отменить проведение конференции?</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Назад
              </Button>
              <Button
                isLoading={isLoading}
                color="danger"
                onPress={async () => {
                  await onSubmitStatus(conference, 'declined');
                  onClose();
                }}>
                Отменить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CancelConferenceModal;
