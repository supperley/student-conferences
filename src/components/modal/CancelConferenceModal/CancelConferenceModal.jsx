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

const CancelConferenceModal = ({ isOpen, onOpen, onOpenChange, conferenceId }) => {
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
                color="danger"
                as={Link}
                href={'/api/conferences/' + conferenceId + '/decline'}
                onPress={onClose}>
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
