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
import ReportModal from '../modal/ReportModal/ReportModal';
import DeleteReportModal from '../modal/DeleteReportModal/DeleteReportModal';
import { useDeleteReportMutation, useUpdateReportMutation } from '../../redux/services/reportApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { reportStatusMap } from '../../shared/data/dataMap';

export const reportTableColumns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Название', uid: 'title', sortable: true },
  { name: 'Автор', uid: 'author', sortable: true },
  { name: 'Конференция', uid: 'conference', sortable: true },
  { name: 'Дата', uid: 'date', sortable: true },
  { name: 'Состояние', uid: 'status', sortable: true },
  { name: 'Действия', uid: 'actions' },
];

const reportSearchColumns = ['title', 'conference.title'];

const INITIAL_VISIBLE_COLUMNS = ['title', 'author', 'conference', 'date', 'status', 'actions'];

export default function ReportsList({ reports, isParentLoading, emptyText }) {
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
  const [modalReport, setModalReport] = useState(undefined);
  const [updateReport, { isLoading: isUpdateLoading }] = useUpdateReportMutation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const onSubmitStatus = async (report, status) => {
    try {
      const data = { id: report._id, reportData: { status } };
      // console.log(data);
      await updateReport(data).unwrap();
    } catch (err) {
      console.log(err);
      toast(JSON.stringify(err));
      if (hasErrorField(err)) {
        setError(err?.data?.message || err?.error);
      }
    }
  };

  const renderCell = React.useCallback((report, columnKey) => {
    const cellValue = report[columnKey];

    switch (columnKey) {
      case 'id':
        return report?._id;
      case 'title':
        return (
          <Link href={'/reports/' + report?._id} className="text-sm font-medium">
            {cellValue}
          </Link>
        );
      case 'author':
        return (
          <Link href={'/users/' + report?.author?._id} className="text-sm">
            {cellValue?.first_name + ' ' + cellValue?.last_name}
          </Link>
        );
      case 'conference':
        return (
          <div className="flex flex-col">
            <Link href={'/conferences/' + report?.conference?._id}>
              <p className="text-bold text-small">{cellValue?.title}</p>
            </Link>
            <Link href={'/conferences/?faculty=' + report?.faculty}>
              <p className="text-bold text-tiny text-default-400">{report?.faculty}</p>
            </Link>
          </div>
        );
      case 'faculty':
        return (
          <Link href={'/conferences/?faculty=' + report?._id} className="text-sm">
            {cellValue}
          </Link>
        );
      case 'date':
        return formatToClientDate(report?.createdAt);
      case 'status':
        return (
          <Chip color={reportStatusMap[report?.status].color} size="sm" variant="flat">
            {reportStatusMap[report?.status].name || cellValue}
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
                    navigate('/reports/' + report?._id);
                  }}>
                  Подробнее
                </DropdownItem>
                {(user?._id === report?.author?._id || user?.role === 'admin') && (
                  <DropdownItem
                    onPress={() => {
                      setModalReport(report);
                      onOpenChangeModalEdit();
                    }}>
                    Редактировать
                  </DropdownItem>
                )}
                {user?._id === report?.author?._id && (
                  <DropdownItem
                    onPress={() => {
                      setModalReport(report);
                      onOpenModalCancel();
                    }}
                    className="text-danger"
                    color="danger">
                    Удалить заявку
                  </DropdownItem>
                )}
                {user?.role === 'admin' && report.status !== 'pending' && (
                  <DropdownItem
                    onPress={() => {
                      onSubmitStatus(report, 'pending');
                    }}
                    className="text-warning"
                    color="warning">
                    На рассмотрение
                  </DropdownItem>
                )}
                {user?.role === 'admin' && report.status !== 'accepted' && (
                  <DropdownItem
                    onPress={() => {
                      onSubmitStatus(report, 'accepted');
                    }}
                    className="text-success"
                    color="success">
                    Принять
                  </DropdownItem>
                )}
                {user?.role === 'admin' && report.status !== 'declined' && (
                  <DropdownItem
                    onPress={() => {
                      onSubmitStatus(report, 'declined');
                    }}
                    className="text-danger"
                    color="danger">
                    Отклонить
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
        statusOptions={reportStatusMap}
        tableColumns={reportTableColumns}
        searchColumns={reportSearchColumns}
        initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
        data={reports}
        emptyText={isParentLoading ? 'Загрузка...' : emptyText}
        inputPlaceholder={'Искать по названию работы или конференции...'}
      />
      <DeleteReportModal
        isOpen={isOpenModalCancel}
        onOpen={onOpenModalCancel}
        onOpenChange={onOpenChangeModalCancel}
        report={modalReport}
        onSubmitStatus={onSubmitStatus}
        isLoading={isUpdateLoading}
      />
      <ReportModal
        isOpen={isOpenModalEdit}
        onOpen={onOpenModalEdit}
        onOpenChange={onOpenChangeModalEdit}
        report={modalReport}
        mode={'edit'}
      />
    </>
  );
}
