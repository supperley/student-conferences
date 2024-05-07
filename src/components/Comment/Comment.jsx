import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Textarea,
  User,
} from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { S3_URL } from '../../shared/config/constants';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import { ReplyIcon } from '../../shared/assets/icons/ReplyIcon';
import { DeleteIcon } from '../../shared/assets/icons/DeleteIcon';
import { EditIcon } from '../../shared/assets/icons/EditIcon';
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../redux/services/commentApi';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { hasErrorField } from '../../shared/utils/hasErrorField';

const Comment = ({ commentData }) => {
  const [deleteComment, { isLoadingDelete }] = useDeleteCommentMutation();
  const [updateComment, { isLoadingUpdate }] = useUpdateCommentMutation();
  const [isEdit, setIsEdit] = useState(false);

  const { handleSubmit, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        text: commentData?.text,
      }),
      [],
    ),
  });

  const onSubmit = async (data) => {
    console.log(commentData);
    try {
      await updateComment({
        id: commentData._id,
        commentData: { text: data?.text },
      }).unwrap();
      setIsEdit(false);
    } catch (err) {
      console.log(err);
      toast(JSON.stringify(err));
      if (hasErrorField(err)) {
        // setError(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <Link
          href={'/users/' + commentData?.author?._id}
          color="foreground"
          className="text-default-500 text-small">
          <User
            name={commentData?.author?.first_name + ' ' + commentData?.author?.last_name}
            description={commentData?.author?.position}
            avatarProps={{
              src: S3_URL + commentData?.author?.avatarUrl,
            }}
          />
        </Link>
        <div className="text-default-500 text-small">
          {formatToClientDate(commentData?.createdAt, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="pt-1">
          {!isEdit ? (
            <p>{commentData?.text}</p>
          ) : (
            <Controller
              control={control}
              name="text"
              render={({ field: { onChange: onChangeText, value: textValue } }) => (
                <Textarea
                  placeholder="Введите комментарий"
                  onChange={onChangeText}
                  value={textValue}
                  variant="bordered"
                />
              )}
            />
          )}
        </CardBody>
        <CardFooter className="pt-0 gap-1 justify-end">
          {!isEdit ? (
            <>
              <Button
                isLoading={isLoadingDelete}
                onPress={() => {
                  deleteComment(commentData?._id);
                }}
                className="px-2"
                startContent={<DeleteIcon filled className="text-default-300" />}
                size="sm"
                variant="light">
                <span className="text-small hidden md:block">Удалить</span>
              </Button>
              <Button
                className="px-2"
                startContent={<EditIcon className="text-default-300" />}
                size="sm"
                variant="light"
                onPress={() => {
                  setIsEdit(true);
                }}>
                <span className="text-small hidden md:block">Редактировать</span>
              </Button>
              {/* <Button
                className="px-2"
                startContent={<ReplyIcon filled className="text-default-300" />}
                size="sm"
                variant="light">
                <span className="text-small hidden md:block">Ответить</span>
              </Button> */}
            </>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="flat"
                onPress={() => {
                  setIsEdit(false);
                }}>
                Отменить
              </Button>
              <Button color="primary" type="submit" isLoading={isLoadingUpdate}>
                Сохранить
              </Button>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default Comment;
