import React, { useState } from 'react';
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
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
// import { users } from '../../shared/data/mockData';
import EditUserModal from '../modal/EditUserModal/EditUserModal';
import { S3_URL } from '../../shared/config/constants';

export const userStatusMap = {
  active: { name: 'Активен', color: 'success' },
  paused: { name: 'Заморожен', color: 'warning' },
  blocked: { name: 'Заблокирован', color: 'danger' },
};

export const userTableColumns = [
  { name: 'ID', uid: '_id', sortable: true },
  { name: 'Имя', uid: 'name', sortable: true },
  { name: 'Статус', uid: 'role', sortable: true },
  { name: 'Кафедра', uid: 'department' },
  { name: 'Факультет', uid: 'faculty' },
  { name: 'Email', uid: 'email' },
  { name: 'Состояние', uid: 'status', sortable: true },
  { name: 'Действия', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = ['name', 'department', 'faculty', 'status', 'actions'];

export default function UsersList({ users }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();
  const [modalUserId, setModalUserId] = useState(undefined);
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          <Link href={'/users/' + user._id}>
            <User
              avatarProps={{ radius: 'lg', src: S3_URL + user?.avatarUrl }}
              description={user.email}
              name={user?.first_name + ' ' + user?.last_name}>
              {user.email}
            </User>
          </Link>
        );
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue}</p>
            <p className="text-bold text-tiny text-default-400">{user.team}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={userStatusMap[user.status].color}
            size="sm"
            variant="flat">
            {userStatusMap[user.status].name || cellValue}
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
                <DropdownItem href={'/users/' + user?._id}>Подробнее</DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalUserId(user?._id);
                    onOpenChangeModalEdit();
                  }}>
                  Редактировать
                </DropdownItem>
                <DropdownItem
                  href={'api/users/' + user?._id + '/unblock'}
                  className="text-success"
                  color="success">
                  Разблокировать
                </DropdownItem>
                <DropdownItem
                  href={'api/users/' + user?._id + '/freeze'}
                  className="text-warning"
                  color="warning">
                  Заморозить
                </DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalUserId(user?._id);
                    onOpen();
                  }}
                  className="text-danger"
                  color="danger">
                  Заблокировать
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
        data={users}
        renderCell={renderCell}
        statusOptions={userStatusMap}
        tableColumns={userTableColumns}
        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Подтвердите действие</ModalHeader>
              <ModalBody>
                <p>Вы действительно хотите заблокировать пользователя?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Отменить
                </Button>
                <Button
                  color="danger"
                  as={Link}
                  href={'/api/users/' + modalUserId + '/block'}
                  onPress={onClose}>
                  Заблокировать
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <EditUserModal
        isOpen={isOpenModalEdit}
        onOpen={onOpenModalEdit}
        onOpenChange={onOpenChangeModalEdit}
      />
    </>
  );
}
