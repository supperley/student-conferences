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
import { conferences } from '../../shared/data/mockData';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';

const statusColorMap: Record<string, ChipProps['color']> = {
  accepted: 'success',
  declined: 'danger',
  pending: 'warning',
};

export const conferencesStatusOptions = [
  { name: 'Активен', uid: 'accepted' },
  { name: 'Отклонен', uid: 'declined' },
  { name: 'На рассмотрении', uid: 'pending' },
];

export const conferencesTableColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Название конференции', uid: 'title', sortable: true },
  { name: 'Администратор', uid: 'administrator', sortable: true },
  { name: 'Факультет', uid: 'faculty' },
  { name: 'Дата', uid: 'date', sortable: true },
  { name: 'Состояние', uid: 'status', sortable: true },
  { name: 'Действия', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = [
  'title',
  'administrator',
  'conference',
  'date',
  'status',
  'actions',
];

const searchInObjectArrayByUid = (arr, what) => arr.find((element) => element.uid === what);

export default function ConferencesList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalReportId, setModalReportId] = useState(undefined);
  const renderCell = React.useCallback((conference, columnKey: React.Key) => {
    const cellValue = conference[columnKey];

    switch (columnKey) {
      case 'title':
        return (
          <Link href={'/conferences/' + conference.id} className="text-sm font-medium">
            {cellValue}
          </Link>
        );
      case 'administrator':
        return (
          <Link href={'/user/' + conference.administrator.id} className="text-sm">
            {cellValue.name}
          </Link>
        );
      // case 'conference':
      //   return (
      //     <div className="flex flex-col">
      //       <Link href={'/conference/' + conference.id}>
      //         <p className="text-bold text-small">{cellValue.name}</p>
      //       </Link>
      //       <Link href={'/conferences/?faculty=' + conference.faculty}>
      //         <p className="text-bold text-tiny text-default-400">{conference.faculty}</p>
      //       </Link>
      //     </div>
      //   );
      case 'faculty':
        return (
          <Link href={'/conferences/?faculty=' + conference.id} className="text-sm">
            {cellValue}
          </Link>
        );
      case 'date':
        return formatToClientDate(cellValue);
      case 'status':
        return (
          <Chip color={statusColorMap[conference.status]} size="sm" variant="flat">
            {searchInObjectArrayByUid(conferencesStatusOptions, cellValue)?.name || cellValue}
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
                <DropdownItem href={'/conferences/' + conference.id}>Подробнее</DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalReportId(conference?.id);
                    onOpen();
                  }}
                  className="text-danger"
                  color="danger">
                  Отменить
                </DropdownItem>
                <DropdownItem
                  href={'/conferences/' + conference.id + '/accept'}
                  className="text-success">
                  Принять
                </DropdownItem>
                <DropdownItem
                  href={'/conferences/' + conference.id + '/decline'}
                  className="text-danger">
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
        statusOptions={conferencesStatusOptions}
        tableColumns={conferencesTableColumns}
        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
        data={conferences}
        isAddButton
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Подтвердите действие</ModalHeader>
              <ModalBody>
                <p>Вы действительно хотите удалить научную работу?</p>
                <p>Это действие нельзя отменить.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Отменить
                </Button>
                <Button
                  color="danger"
                  as={Link}
                  href={'/conferences/' + modalReportId + '/delete'}
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
