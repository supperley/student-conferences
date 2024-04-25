import React, { useState } from 'react';
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Link,
  useDisclosure,
} from '@nextui-org/react';
import { VerticalDotsIcon } from '../../shared/assets/icons/VerticalDotsIcon';
import TableData from '../TableData/TableData';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import EditConferenceModal from '../modal/EditConferenceModal/EditConferenceModal';
import AddConferenceModal from '../modal/AddConferenceModal/AddConferenceModal';
import CancelConferenceModal from '../modal/CancelConferenceModal/CancelConferenceModal';
import { conferenceStatusMap } from '../../shared/data/dataMap';

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

export default function ConferencesList({ conferences, emptyText }) {
  const {
    isOpen: isOpenModalCancel,
    onOpen: onOpenModalCancel,
    onOpenChange: onOpenChangeModalCancel,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenModalAdd,
    onOpen: onOpenModalAdd,
    onOpenChange: onOpenChangeModalAdd,
  } = useDisclosure();
  const [modalConferenceId, setModalConferenceId] = useState(undefined);
  const renderCell = React.useCallback((conference, columnKey) => {
    const cellValue = conference[columnKey];

    switch (columnKey) {
      case 'title':
        return (
          <Link href={'/conferences/' + conference._id} className="text-sm font-medium">
            {cellValue}
          </Link>
        );
      case 'administrator':
        return (
          <Link href={'/users/' + conference.administrator._id} className="text-sm">
            {cellValue.first_name + ' ' + cellValue.last_name}
          </Link>
        );
      case 'faculty':
        return (
          <Link href={'/conferences/?faculty=' + conference._id} className="text-sm">
            {cellValue}
          </Link>
        );
      case 'date':
        return formatToClientDate(cellValue);
      case 'status':
        return (
          <Chip color={conferenceStatusMap[conference?.status]?.color} size="sm" variant="flat">
            {conferenceStatusMap[conference?.status]?.name || cellValue}
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
                <DropdownItem href={'/conferences/' + conference._id}>Подробнее</DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalConferenceId(conference?._id);
                    onOpenModalEdit();
                  }}
                  // href={'/conferences/' + conference._id}
                >
                  Редактировать
                </DropdownItem>
                <DropdownItem href={'/conferences/' + conference._id + '/generatePDF'}>
                  Сформировать сборник
                </DropdownItem>
                <DropdownItem
                  href={'/api/conferences/' + conference._id + '/accept'}
                  className="text-warning"
                  color="warning">
                  Закрыть регистрацию
                </DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalConferenceId(conference?._id);
                    onOpenModalCancel();
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
        statusOptions={conferenceStatusMap}
        tableColumns={conferencesTableColumns}
        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
        data={conferences}
        isAddButton
        onAddModal={() => {
          onOpenModalAdd();
        }}
        emptyText={emptyText}
      />
      <CancelConferenceModal
        isOpen={isOpenModalCancel}
        onOpen={onOpenModalCancel}
        onOpenChange={onOpenChangeModalCancel}
        conferenceId={modalConferenceId}
      />
      <AddConferenceModal
        isOpen={isOpenModalAdd}
        onOpen={onOpenModalAdd}
        onOpenChange={onOpenChangeModalAdd}
      />
      <EditConferenceModal
        isOpen={isOpenModalEdit}
        onOpen={onOpenModalEdit}
        onOpenChange={onOpenChangeModalEdit}
      />
    </>
  );
}
