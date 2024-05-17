import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteAccountMutation, useLogoutMutation } from '../../../redux/services/authApi';

const DeleteAccountModal = ({ isOpen, onOpenChange }) => {
  const [deleteAccount, { isLoading: isDeleteLoading }] = useDeleteAccountMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Подтвердите действие</ModalHeader>
            <ModalBody>
              <p>Вы действительно удалить свой аккаунт?</p>
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
                  await deleteAccount();
                  onClose();
                  await logout();
                  navigate('/');
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

export default DeleteAccountModal;
