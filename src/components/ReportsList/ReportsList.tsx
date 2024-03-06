import React, { useState } from 'react';
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  ChipProps,
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

const statusColorMap: Record<string, ChipProps['color']> = {
  accepted: 'success',
  declined: 'danger',
  pending: 'warning',
};

export const reportStatusOptions = [
  { name: 'Активен', uid: 'accepted' },
  { name: 'Отклонен', uid: 'declined' },
  { name: 'На рассмотрении', uid: 'pending' },
];

export const reportTableColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Название', uid: 'name', sortable: true },
  { name: 'Автор', uid: 'author', sortable: true },
  { name: 'Конференция', uid: 'conference', sortable: true },
  { name: 'Факультет', uid: 'faculty' },
  { name: 'Дата', uid: 'date', sortable: true },
  { name: 'Состояние', uid: 'status', sortable: true },
  { name: 'Действия', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = ['name', 'author', 'conference', 'date', 'status', 'actions'];

const searchInObjectArrayByUid = (arr, what) => arr.find((element) => element.uid === what);

export default function ReportsList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalReportId, setModalReportId] = useState(undefined);
  const renderCell = React.useCallback((report: User, columnKey: React.Key) => {
    const cellValue = report[columnKey as keyof User];

    switch (columnKey) {
      case 'name':
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
          <Chip color={statusColorMap[report.status]} size="sm" variant="flat">
            {searchInObjectArrayByUid(reportStatusOptions, cellValue)?.name || cellValue}
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
                <DropdownItem href={'/report/' + report.id + '/edit'}>Редактировать</DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalReportId(report?.id);
                    onOpen();
                  }}
                  className="text-danger"
                  color="danger">
                  Удалить заявку
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
        statusOptions={reportStatusOptions}
        tableColumns={reportTableColumns}
        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
        data={userReports}
        isAddButton
      />
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
    </>
  );
}
