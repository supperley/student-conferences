import React, { useState } from 'react';
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { VerticalDotsIcon } from '../../shared/assets/icons/VerticalDotsIcon';
import TableData from '../TableData/TableData';
import { userReports } from '../../shared/data/mockData';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import EditReportModal from '../modal/EditReportModal/EditReportModal';

export const reportStatusMap = {
  accepted: { name: 'Активен', color: 'success' },
  pending: { name: 'На рассмотрении', color: 'warning' },
  declined: { name: 'Отклонен', color: 'danger' },
};

export const reportTableColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Название', uid: 'title', sortable: true },
  { name: 'Автор', uid: 'author', sortable: true },
  { name: 'Конференция', uid: 'conference', sortable: true },
  { name: 'Факультет', uid: 'faculty' },
  { name: 'Дата', uid: 'date', sortable: true },
  { name: 'Состояние', uid: 'status', sortable: true },
  { name: 'Действия', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = ['title', 'author', 'conference', 'date', 'status', 'actions'];

export default function ReportsList() {
  const {
    isOpen: isOpenModalDialog,
    onOpen: onOpenModalDialog,
    onOpenChange: onOpenChangeModalDialog,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();
  const [modalReportId, setModalReportId] = useState(undefined);
  const renderCell = React.useCallback((report, columnKey) => {
    const cellValue = report[columnKey];

    switch (columnKey) {
      case 'title':
        return (
          <Link href={'/report/' + report.id} className="text-sm font-medium">
            {cellValue}
          </Link>
        );
      case 'author':
        return (
          <Link href={'/user/' + report.author.id} className="text-sm">
            {cellValue.name}
          </Link>
        );
      case 'conference':
        return (
          <div className="flex flex-col">
            <Link href={'/conference/' + report.conference.id}>
              <p className="text-bold text-small">{cellValue.name}</p>
            </Link>
            <Link href={'/conferences/?faculty=' + report.faculty}>
              <p className="text-bold text-tiny text-default-400">{report.faculty}</p>
            </Link>
          </div>
        );
      case 'faculty':
        return (
          <Link href={'/conferences/?faculty=' + report.id} className="text-sm">
            {cellValue}
          </Link>
        );
      case 'date':
        return formatToClientDate(cellValue);
      case 'status':
        return (
          <Chip color={reportStatusMap[report.status].color} size="sm" variant="flat">
            {reportStatusMap[report.status].name || cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem href={'/report/' + report.id}>Подробнее</DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalReportId(report?.id);
                    onOpenChangeModalEdit();
                  }}>
                  Редактировать
                </DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalReportId(report?.id);
                    onOpenModalDialog();
                  }}
                  className="text-danger"
                  color="danger">
                  Отменить заявку
                </DropdownItem>
                <DropdownItem href={'/report/' + report.id + '/accept'} className="text-success">
                  Принять
                </DropdownItem>
                <DropdownItem href={'/report/' + report.id + '/decline'} className="text-danger">
                  Отклонить
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <TableData
        renderCell={renderCell}
        statusOptions={reportStatusMap}
        tableColumns={reportTableColumns}
        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
        data={userReports}
      />
      <Modal isOpen={isOpenModalDialog} onOpenChange={onOpenChangeModalDialog}>
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
                  color="danger"
                  as={Link}
                  href={'/report/' + modalReportId + '/delete'}
                  onPress={onClose}>
                  Удалить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <EditReportModal
        isOpen={isOpenModalEdit}
        onOpen={onOpenModalEdit}
        onOpenChange={onOpenChangeModalEdit}
      />
    </>
  );
}