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
  completed: 'default',
  registrationOpen: 'success',
  registrationClosed: 'warning',
  declined: 'danger',
};

export const conferencesStatusOptions = [
  { name: 'Проведена', uid: 'completed' },
  { name: 'Отменена', uid: 'declined' },
  { name: 'Регистрация открыта', uid: 'registrationOpen' },
  { name: 'Регистрация закрыта', uid: 'registrationClosed' },
];

export const conferencesTableColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Название конференции', uid: 'title', sortable: true },
  { name: 'Администратор', uid: 'administrator', sortable: true },
  { name: 'Факультет', uid: 'faculty', sortable: true },
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
  const [modalConferenceId, setModalConferenceId] = useState(undefined);
  const renderCell = React.useCallback((conference, columnKey: React.Key) => {
    const cellValue = conference[columnKey];

    switch (columnKey) {
      case 'title':
        return (
          <Link href={'/conference/' + conference.id} className="text-sm font-medium">
            {cellValue}
          </Link>
        );
      case 'administrator':
        return (
          <Link href={'/user/' + conference.administrator.id} className="text-sm">
            {cellValue.name}
          </Link>
        );
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
                <DropdownItem href={'/conference/' + conference.id}>Подробнее</DropdownItem>
                <DropdownItem href={'/conference/' + conference.id}>Редактировать</DropdownItem>
                <DropdownItem href={'/conference/' + conference.id + '/download'}>
                  Сформировать сборник
                </DropdownItem>
                <DropdownItem
                  href={'/conference/' + conference.id + '/accept'}
                  className="text-warning"
                  color="warning">
                  Закрыть регистрацию
                </DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalConferenceId(conference?.id);
                    onOpen();
                  }}
                  className="text-danger"
                  color="danger">
                  Отменить проведение
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
                <p>Вы действительно хотите отменить проведение конференции?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Назад
                </Button>
                <Button
                  color="danger"
                  as={Link}
                  href={'/conference/' + modalConferenceId + '/decline'}
                  onPress={onClose}>
                  Отменить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
