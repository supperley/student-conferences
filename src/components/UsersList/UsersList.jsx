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
  useDisclosure,
} from '@nextui-org/react';
import { VerticalDotsIcon } from '../../shared/assets/icons/VerticalDotsIcon';
import TableData from '../TableData/TableData';
import EditUserModal from '../modal/EditUserModal/EditUserModal';
import { S3_URL } from '../../shared/config/constants';
import { useUpdateUserMutation } from '../../redux/services/userApi';
import { faculties } from '../../shared/data/dataMap';
import BlockUserModal from '../modal/BlockUserModal/BlockUserModal';
import { hasErrorField } from '../../shared/utils/hasErrorField';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { userStatusMap } from '../../shared/data/dataMap';

export const userTableColumns = [
  { name: 'ID', uid: '_id', sortable: true },
  { name: 'Имя', uid: 'name', sortable: true },
  { name: 'Права', uid: 'role', sortable: true },
  { name: 'Должность', uid: 'position' },
  { name: 'Факультет', uid: 'faculty' },
  { name: 'Email', uid: 'email' },
  { name: 'Состояние', uid: 'status', sortable: true },
  { name: 'Действия', uid: 'actions' },
];

const INITIAL_VISIBLE_COLUMNS = ['name', 'faculty', 'position', 'status', 'actions'];

export default function UsersList({ users, emptyText }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();
  const [modalUser, setModalUser] = useState(undefined);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const currentUser = useSelector(selectUser);

  const onSubmit = async (data) => {
    try {
      await updateUser({ id: data._id, userData: data }).unwrap();
      // setSelected('login');
    } catch (err) {
      console.log(err);
      toast(JSON.stringify(err));
      if (hasErrorField(err)) {
        setError(err?.data?.message || err?.error);
      }
    }
  };

  const onSubmitStatus = async (user, status) => {
    try {
      const data = { id: user?._id, userData: { status } };
      // console.log(data);
      await updateUser(data).unwrap();
    } catch (err) {
      console.log(err);
      toast(JSON.stringify(err));
      if (hasErrorField(err)) {
        setError(err?.data?.message || err?.error);
      }
    }
  };

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
      case 'faculty':
        return <span>{faculties.find((o) => o.value === cellValue)?.label}</span>;
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
                {/* {currentUser?.role === 'admin' && (
                  <DropdownItem
                    onPress={() => {
                      setModalUser(user);
                      onOpenChangeModalEdit();
                    }}>
                    Редактировать
                  </DropdownItem>
                )} */}
                {currentUser?.role === 'admin' &&
                  user.status !== 'active' &&
                  currentUser?._id !== user?._id && (
                    <DropdownItem
                      className="text-success"
                      color="success"
                      onPress={() => {
                        onSubmitStatus(user, 'active');
                      }}>
                      Разблокировать
                    </DropdownItem>
                  )}
                {/* {currentUser?.role === 'admin' && user.status !== 'freezing' && (
                  <DropdownItem className="text-warning" color="warning">
                    Заморозить
                  </DropdownItem>
                )} */}
                {currentUser?.role === 'admin' &&
                  user?.status !== 'blocked' &&
                  currentUser?._id !== user?._id && (
                    <DropdownItem
                      onPress={() => {
                        setModalUser(user);
                        onOpen();
                      }}
                      className="text-danger"
                      color="danger">
                      Заблокировать
                    </DropdownItem>
                  )}
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
        emptyText={emptyText}
      />
      <BlockUserModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalUser={modalUser}
        onSubmitStatus={onSubmitStatus}
      />
      <EditUserModal
        isOpen={isOpenModalEdit}
        onOpen={onOpenModalEdit}
        onOpenChange={onOpenChangeModalEdit}
      />
    </>
  );
}
