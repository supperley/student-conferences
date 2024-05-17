import {
  Button,
  Input,
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
import { toast } from 'sonner';
import { useCreateNewsMutation, useUpdateNewsMutation } from '../../../redux/services/newsApi';
import { CheckIcon } from '../../../shared/assets/icons/CheckIcon';
import { UploadIcon } from '../../../shared/assets/icons/UploadIcon';
import { chipDataMap, facultiesDataMap } from '../../../shared/data/dataMap';
import { hasErrorField } from '../../../shared/utils/hasErrorField';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';

const NewsModal = ({ isOpen, onOpenChange, mode = 'add', news = {} }) => {
  const [createNews, { isLoading: isCreateLoading }] = useCreateNewsMutation();
  const [updateNews, { isLoading: isUpdateLoading }] = useUpdateNewsMutation();
  const [error, setError] = useState('');
  const uploaderRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDeleteImage, setIsDeleteImage] = useState(false);
  const handleImageChange = () => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const { handleSubmit, getValues, control, setValue } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        title: '',
        description: '',
        faculties: new Set([]),
        chip: '',
        image: '',
      }),
      [news],
    ),
  });

  useEffect(() => {
    // console.log('faculties', getValues('faculties'), news?.faculties);
    // console.log('chip', getValues('chip'), news?.chip);
    //console.log(news);
    getValues('_id') || setValue('_id', news?._id);
    getValues('title') || setValue('title', news?.title);
    getValues('description') || setValue('description', news?.description);
    getValues('faculties')?.size > 0 || setValue('faculties', news?.faculties);
    getValues('chip')[0] || setValue('chip', [news?.chip]);
  }, [news]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
      <ModalContent className="!my-3">
        {(onClose) => {
          const onSubmit = async (data) => {
            try {
              {
                /* console.log(data); */
              }
              const formData = new FormData();
              data.title && formData.append('title', data.title);
              data.description && formData.append('description', data.description);
              data.faculties &&
                Array.from(data.faculties).forEach((faculty) => {
                  formData.append('faculties', faculty);
                });
              data.chip && [...data.chip][0] && formData.append('chip', [...data.chip][0]);
              isDeleteImage && formData.append('image', 'delete');
              selectedFile && formData.append('image', selectedFile);

              if (mode === 'add') {
                await createNews(formData).unwrap();
              } else {
                await updateNews({ id: data._id, newsData: formData }).unwrap();
              }

              onClose();
              setSelectedFile(null);
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
                {mode === 'add' ? 'Добавление' : 'Редактирование'} новости
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange: onChangeTitle, value: titleValue } }) => (
                      <Input
                        label="Заголовок новости"
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
                    name="description"
                    render={({
                      field: { onChange: onChangeDescription, value: descriptionValue },
                    }) => (
                      <Textarea
                        label="Основной текст"
                        onChange={onChangeDescription}
                        value={descriptionValue}
                        variant="bordered"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="faculties"
                    render={({ field: { onChange: onChangeFaculties, value: facultiesValue } }) => (
                      <Select
                        label="Факультеты"
                        selectionMode="multiple"
                        variant="bordered"
                        selectedKeys={facultiesValue}
                        onSelectionChange={onChangeFaculties}>
                        {Object.values(facultiesDataMap).map((faculty) => (
                          <SelectItem key={faculty.value} value={faculty.value}>
                            {faculty.label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Controller
                    control={control}
                    name="chip"
                    render={({
                      field: { onChange: onChangeChip, onBlur, value: chipValue, ref },
                    }) => (
                      <Select
                        label="Тип новости"
                        variant="bordered"
                        selectedKeys={chipValue}
                        onSelectionChange={onChangeChip}>
                        {Object.values(chipDataMap).map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                  <input
                    ref={uploaderRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex gap-5">
                    {mode === 'edit' && news?.imageUrl && (
                      <Button
                        className="w-1/3"
                        startContent={isDeleteImage && <CheckIcon />}
                        onClick={() => {
                          setIsDeleteImage((prev) => !prev);
                        }}
                        variant="flat"
                        color={isDeleteImage ? 'danger' : 'default'}>
                        Удалить изображение
                      </Button>
                    )}
                    <Button
                      className={mode === 'edit' && news?.imageUrl ? 'w-2/3' : 'w-full'}
                      startContent={!selectedFile?.name && <UploadIcon />}
                      onClick={() => uploaderRef.current.click()}
                      variant="flat">
                      {selectedFile?.name ||
                        `${mode === 'add' ? 'Загрузить' : 'Обновить'} изображение`}
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter className="justify-end items-center">
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
              {/* <DevTool control={control} /> */}
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default NewsModal;
