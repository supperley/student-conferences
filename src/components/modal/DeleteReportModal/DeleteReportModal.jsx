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
import { toast } from 'sonner';
import { useDeleteReportMutation } from '../../../redux/services/reportApi';

const DeleteReportModal = ({ isOpen, onOpenChange, report }) => {
  const navigate = useNavigate();
  const [deleteReport, { isLoading: isDeleteLoading }] = useDeleteReportMutation();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Подтвердите действие</ModalHeader>
            <ModalBody>
              <p>Вы действительно хотите удалить данную заявку?</p>
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
                  try {
                    await deleteReport(report._id).unwrap();
                    onClose();
                    navigate('/reports');
                  } catch (err) {
                    toast.error(JSON.stringify(err));
                  }
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

export default DeleteReportModal;
