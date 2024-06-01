import { Button, Card, CardBody, CardFooter, CardHeader, Textarea, User } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../redux/services/commentApi';
import { DeleteIcon } from '../../shared/assets/icons/DeleteIcon';
import { EditIcon } from '../../shared/assets/icons/EditIcon';
import { S3_URL } from '../../shared/config/constants';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import { getErrorField } from '../../shared/utils/getErrorField';
import { Link } from '../Link/Link';

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

  const onDelete = async () => {
    try {
      await deleteComment(commentData?._id).unwrap();
    } catch (err) {
      console.log(err);
      if (getErrorField(err)) {
        toast.error(getErrorField(err));
      } else {
        toast.error(JSON.stringify(err));
      }
    }
  };

  const onEdit = async (data) => {
    console.log(commentData);
    try {
      await updateComment({
        id: commentData._id,
        commentData: { text: data?.text },
      }).unwrap();
      setIsEdit(false);
    } catch (err) {
      console.log(err);
      toast.error(JSON.stringify(err));
      if (getErrorField(err)) {
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
      <form onSubmit={handleSubmit(onEdit)}>
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
                  onDelete();
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
