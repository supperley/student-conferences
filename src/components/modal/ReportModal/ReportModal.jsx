import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  useCreateReportMutation,
  useUpdateReportMutation,
} from '../../../redux/services/reportApi';
import { useGetAllUsersQuery } from '../../../redux/services/userApi';
import { CheckIcon } from '../../../shared/assets/icons/CheckIcon';
import { UploadIcon } from '../../../shared/assets/icons/UploadIcon';
import { S3_URL } from '../../../shared/config/constants';
import { hasErrorField } from '../../../shared/utils/hasErrorField';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';

const ReportModal = ({ isOpen, onOpenChange, mode = 'add', report = {} }) => {
  const { data: users, error: usersError, isLoading: isUsersLoading } = useGetAllUsersQuery();
  const [createReport, { isLoading: isCreateLoading }] = useCreateReportMutation();
  const [updateReport, { isLoading: isUpdateLoading }] = useUpdateReportMutation();
  const [error, setError] = useState('');
  const uploaderRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDeleteFile, setIsDeleteFile] = useState(false);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [isCheckboxInvalid, setIsCheckboxInvalid] = useState(false);
  const params = useParams();
  const conferenceId = params.conferenceId;
  const handleFileChange = () => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const { handleSubmit, register, control, setValue, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        title: '',
        description: '',
        supervisor: '',
        conference: '',
      }),
      [report],
    ),
  });

  useEffect(() => {
    getValues('_id') || setValue('_id', report?._id);
    getValues('title') || setValue('title', report?.title);
    getValues('description') || setValue('description', report?.description);
    getValues('supervisor') || setValue('supervisor', report?.supervisor?._id);
    getValues('conference') || setValue('conference', conferenceId);
  }, [report]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => {
          const onSubmit = async (data) => {
            try {
              if (mode === 'add' && !isCheckboxSelected) {
                setIsCheckboxInvalid(true);
                return;
              }
              const formData = new FormData();
              data.title && formData.append('title', data.title);
              data.description && formData.append('description', data.description);
              data.supervisor && formData.append('supervisor', data.supervisor);
              data.conference && formData.append('conference', data.conference);
              isDeleteFile && formData.append('file', 'delete');
              selectedFile && formData.append('file', selectedFile);

              if (mode === 'add') {
                await createReport(formData).unwrap();
              } else {
                await updateReport({ id: data._id, reportData: formData }).unwrap();
              }

              onClose();
              setSelectedFile(null);
              toast.success('Научная работа успешно добавлена');
            } catch (err) {
              console.log(err);
              toast(JSON.stringify(err));
              if (hasErrorField(err)) {
                setError(err?.data?.message || err?.error);
              }
            }
          };

          return (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {mode === 'add' ? 'Подать' : 'Редактировать'} заявку
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange: onChangeTitle, value: titleValue } }) => (
                      <Input
                        label="Тема научной работы"
                        variant="bordered"
                        isRequired
                        errorMessage="Обязательное поле"
                        onChange={onChangeTitle}
                        value={titleValue}
                      />
                    )}
                  />
                  <Select
                    label="Научный руководитель"
                    variant="bordered"
                    isLoading={isUsersLoading}
                    {...register('supervisor')}
                    items={users || []}
                    classNames={{
                      label: 'group-data-[filled=true]:-translate-y-6',
                      trigger: 'min-h-20',
                    }}
                    renderValue={(items) => {
                      return items.map((item) => (
                        <div key={item.data._id} className="flex items-center gap-2">
                          <Avatar
                            alt={item.data.first_name + ' ' + item.data.last_name}
                            className="flex-shrink-0"
                            size="sm"
                            src={S3_URL + item.data.avatarUrl}
                          />
                          <div className="flex flex-col">
                            <span>{item.data.first_name + ' ' + item.data.last_name}</span>
                            <span className="text-default-500 text-tiny">({item.data.email})</span>
                          </div>
                        </div>
                      ));
                    }}>
                    {(user) => (
                      <SelectItem key={user._id} textValue={user.last_name}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            alt={user.first_name + ' ' + user.last_name}
                            className="flex-shrink-0"
                            size="sm"
                            src={S3_URL + user.avatarUrl}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">
                              {user.first_name + ' ' + user.last_name}
                            </span>
                            <span className="text-tiny text-default-400">{user.email}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  <Controller
                    control={control}
                    name="description"
                    render={({
                      field: { onChange: onChangeDescription, value: descriptionValue },
                    }) => (
                      <Textarea
                        label="Дополнительная информация"
                        onChange={onChangeDescription}
                        value={descriptionValue}
                        variant="bordered"
                      />
                    )}
                  />
                  <input
                    ref={uploaderRef}
                    type="file"
                    accept=".doc, .docx, .pdf"
                    onChange={() => handleFileChange()}
                    className="hidden"
                  />
                  <div className="flex gap-3 justify-between">
                    {mode === 'edit' && report?.fileUrl && (
                      <Button
                        className="w-2/4"
                        startContent={isDeleteFile && <CheckIcon />}
                        onClick={() => {
                          setIsDeleteFile((prev) => !prev);
                        }}
                        variant="flat"
                        color={isDeleteFile ? 'danger' : 'default'}>
                        Удалить файл
                      </Button>
                    )}
                    <Button
                      className={mode === 'edit' && report?.fileUrl ? 'w-3/4' : 'w-full'}
                      startContent={!selectedFile?.name && <UploadIcon />}
                      onClick={() => uploaderRef.current.click()}
                      variant="flat">
                      {selectedFile?.name || `${mode === 'add' ? 'Загрузить' : 'Обновить'} файл`}
                    </Button>
                  </div>

                  {mode == 'add' && (
                    <Checkbox
                      isInvalid={isCheckboxInvalid}
                      isSelected={isCheckboxSelected}
                      onValueChange={() => {
                        setIsCheckboxSelected((value) => !value);
                        setIsCheckboxInvalid(isCheckboxSelected);
                      }}
                      size="sm">
                      Согласен с политикой обработки персональных данных
                    </Checkbox>
                  )}
                </ModalBody>
                <ModalFooter className="justify-between">
                  <Link color="primary" href="/help" size="sm">
                    Возникли вопросы?
                  </Link>
                  <ErrorMessage error={error} />
                  <div className="flex gap-2">
                    <Button variant="flat" onPress={onClose}>
                      Отменить
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      isLoading={mode === 'add' ? isCreateLoading : isUpdateLoading}>
                      {mode === 'add' ? 'Добавить' : 'Обновить'}
                    </Button>
                  </div>
                </ModalFooter>
              </form>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
