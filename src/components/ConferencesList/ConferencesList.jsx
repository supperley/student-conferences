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
import ConferenceModal from '../modal/ConferenceModal/ConferenceModal';
import CancelConferenceModal from '../modal/CancelConferenceModal/CancelConferenceModal';
import { conferenceStatusMap } from '../../shared/data/dataMap';
import { useUpdateConferenceMutation } from '../../redux/services/conferenceApi';
import { hasErrorField } from '../../shared/utils/hasErrorField';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { faculties } from '../../shared/data/mockData';

export const conferencesTableColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Название конференции', uid: 'title', sortable: true },
  { name: 'Администратор', uid: 'administrator', sortable: true },
  { name: 'Факультеты', uid: 'faculties', sortable: true },
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

export default function ConferencesList({ conferences, emptyText, isParentLoading }) {
  // console.log('render ConferencesList');
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
  const [modalConference, setModalConference] = useState(undefined);
  const [updateConference, { isUpdateLoading }] = useUpdateConferenceMutation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const onSubmitStatus = async (conference, status) => {
    try {
      const data = { id: conference?._id, conferenceData: { status } };
      // console.log(data);
      await updateConference(data).unwrap();
    } catch (err) {
      console.log(err);
      if (hasErrorField(err)) {
        setError(err?.data?.message || err?.error);
      }
    }
  };

  const renderCell = React.useCallback((conference, columnKey) => {
    const cellValue = conference[columnKey];

    switch (columnKey) {
      case 'id':
        return conference?._id;
      case 'title':
        return (
          <Link href={'/conferences/' + conference?._id} className="text-sm font-medium">
            {cellValue}
          </Link>
        );
      case 'administrator':
        return (
          <Link href={'/users/' + conference.administrator?._id} className="text-sm">
            {cellValue?.first_name + ' ' + cellValue?.last_name}
          </Link>
        );
      case 'faculties':
        return conference?.faculties
          ?.map((faculty) => {
            return faculties.find((o) => o.value === faculty)?.label;
          })
          .join(', ');
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
                <DropdownItem
                  onPress={() => {
                    navigate('/conferences/' + conference?._id);
                  }}>
                  Подробнее
                </DropdownItem>
                {(user?._id === conference?.administrator?._id || user?.role === 'admin') && (
                  <DropdownItem
                    onPress={() => {
                      setModalConference(conference);
                      onOpenModalEdit();
                    }}>
                    Редактировать
                  </DropdownItem>
                )}
                {user?.role === 'admin' && (
                  <DropdownItem href={'/conferences/' + conference?._id + '/generatePDF'}>
                    Сформировать сборник
                  </DropdownItem>
                )}
                {(user?._id === conference?.administrator?._id || user?.role === 'admin') &&
                  conference.status !== 'registrationOpen' && (
                    <DropdownItem
                      className="text-success"
                      color="success"
                      onPress={() => {
                        onSubmitStatus(conference, 'registrationOpen');
                      }}>
                      Открыть регистрацию
                    </DropdownItem>
                  )}
                {(user?._id === conference?.administrator?._id || user?.role === 'admin') &&
                  conference.status == 'registrationOpen' && (
                    <DropdownItem
                      className="text-warning"
                      color="warning"
                      onPress={() => {
                        onSubmitStatus(conference, 'registrationClosed');
                      }}>
                      Закрыть регистрацию
                    </DropdownItem>
                  )}
                {(user?._id === conference?.administrator?._id || user?.role === 'admin') &&
                  conference.status !== 'declined' && (
                    <DropdownItem
                      onPress={() => {
                        setModalConference(conference);
                        onOpenModalCancel();
                      }}
                      className="text-danger"
                      color="danger">
                      Отменить проведение
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
        renderCell={renderCell}
        statusOptions={conferenceStatusMap}
        tableColumns={conferencesTableColumns}
        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
        data={conferences}
        isAddButton
        onOpenModalAdd={() => {
          onOpenModalAdd();
        }}
        emptyText={isParentLoading ? 'Загрузка...' : emptyText}
      />
      <CancelConferenceModal
        isOpen={isOpenModalCancel}
        onOpen={onOpenModalCancel}
        onOpenChange={onOpenChangeModalCancel}
        conference={modalConference}
        onSubmitStatus={onSubmitStatus}
      />
      <ConferenceModal
        isOpen={isOpenModalAdd}
        onOpen={onOpenModalAdd}
        onOpenChange={onOpenChangeModalAdd}
      />
      <ConferenceModal
        isOpen={isOpenModalEdit}
        onOpen={onOpenModalEdit}
        onOpenChange={onOpenChangeModalEdit}
        conference={modalConference}
        mode={'edit'}
      />
    </>
  );
}
