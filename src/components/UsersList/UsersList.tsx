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
import { users } from '../../shared/data/mockData';

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

export const userStatusOptions = [
  { name: 'Активен', uid: 'active' },
  { name: 'Заблокирован', uid: 'paused' },
  { name: 'Заморожен', uid: 'vacation' },
];

export const userTableColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Имя', uid: 'name', sortable: true },
  { name: 'Возраст', uid: 'age', sortable: true },
  { name: 'Роль', uid: 'role', sortable: true },
  { name: 'Факультет', uid: 'faculty' },
  { name: 'Email', uid: 'email' },
  { name: 'Состояние', uid: 'status', sortable: true },
  { name: 'Действия', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = ['name', 'role', 'status', 'actions'];

const searchInObjectArrayByUid = (arr, what) => arr.find((element) => element.uid === what);

type User = (typeof users)[0];

export default function UsersList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalUserId, setModalUserId] = useState(undefined);
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case 'name':
        return (
          <Link href={'/user/' + user.id}>
            <User
              avatarProps={{ radius: 'lg', src: user.avatar }}
              description={user.email}
              name={cellValue}>
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
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {searchInObjectArrayByUid(userStatusOptions, cellValue)?.name || cellValue}
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
                <DropdownItem href={'/user/' + user?.id}>Подробнее</DropdownItem>
                <DropdownItem href={'/user/' + user?.id + '/edit'}>Редактировать</DropdownItem>
                <DropdownItem
                  onPress={() => {
                    setModalUserId(user?.id);
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
        statusOptions={userStatusOptions}
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
                  href={'/user/' + modalUserId + '/block'}
                  onPress={onClose}>
                  Заблокировать
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}