import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
import { CheckIcon } from '../../../shared/assets/icons/CheckIcon';
import { UploadIcon } from '../../../shared/assets/icons/UploadIcon';
import { getErrorField } from '../../../shared/utils/getErrorField';
import { Link } from '../../Link/Link';

const ReportModal = ({ isOpen, onOpenChange, mode = 'add', report = {} }) => {
  const [createReport, { isLoading: isCreateLoading }] = useCreateReportMutation();
  const [updateReport, { isLoading: isUpdateLoading }] = useUpdateReportMutation();
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
    setValue('_id', report?._id);
    setValue('title', report?.title);
    setValue('description', report?.description);
    setValue('supervisor', report?.supervisor);
    setValue('conference', conferenceId);
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
              toast.success(`Научная работа успешно ${mode === 'add' ? 'добавлена' : 'обновлена'}`);
            } catch (err) {
              console.log(err);
              toast.error(getErrorField(err));
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
                  <Controller
                    control={control}
                    name="supervisor"
                    render={({
                      field: { onChange: onChangeSupervisor, value: supervisorValue },
                    }) => (
                      <Input
                        label="Научный руководитель"
                        variant="bordered"
                        errorMessage="Обязательное поле"
                        onChange={onChangeSupervisor}
                        value={supervisorValue}
                      />
                    )}
                  />
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
