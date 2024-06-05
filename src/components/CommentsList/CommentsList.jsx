import { Button, Textarea } from '@nextui-org/react';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useCreateReportCommentMutation } from '../../redux/services/reportApi';
import { selectUser } from '../../redux/slices/authSlice';
import { getErrorField } from '../../shared/utils/getErrorField';
import Comment from '../Comment/Comment';

export const CommentsList = ({ comments = [], reportId }) => {
  const [createComment, { isLoading }] = useCreateReportCommentMutation();
  const [isTextareaActive, setIsTextareaActive] = useState(false);
  const user = useSelector(selectUser);

  const { handleSubmit, control, watch, reset, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: useMemo(
      () => ({
        text: '',
      }),
      [],
    ),
  });

  const onSubmit = async (data) => {
    try {
      await createComment({ reportId, commentData: { author: user?._id, ...data } }).unwrap();
      reset();
    } catch (err) {
      console.log(err);
      toast.error(getErrorField(err));
    }
  };

  const watchComment = watch('text');

  useEffect(() => {
    if (!getValues('text').length) {
      setIsTextareaActive(false);
    } else {
      setIsTextareaActive(true);
    }
  }, [watchComment]);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-3xl">Комментарии</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
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
          {isTextareaActive && (
            <div className="flex gap-2 self-end">
              <Button
                variant="flat"
                onPress={() => {
                  reset();
                }}>
                Отменить
              </Button>
              <Button color="primary" type="submit" isLoading={isLoading}>
                Отправить
              </Button>
            </div>
          )}
        </div>
      </form>
      {comments.length ? (
        comments.map((comment) => {
          return <Comment commentData={comment} />;
        })
      ) : (
        <div>Комментариев пока нет. Будьте первым!</div>
      )}
    </div>
  );
};
