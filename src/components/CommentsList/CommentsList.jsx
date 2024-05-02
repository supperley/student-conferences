import React, { useEffect, useState } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import Comment from '../Comment/Comment';

export const CommentsList = ({ comments = [] }) => {
  const [isTextareaActive, setIsTextareaActive] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!newComment.length) {
      setIsTextareaActive(false);
    } else {
      setIsTextareaActive(true);
    }
  }, [newComment]);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-3xl">Комментарии</h2>
      {/* <h2 className="font-bold text-2xl mb-5">Оставить комментарий</h2> */}
      <Textarea
        value={newComment}
        variant="bordered"
        placeholder="Введите комментарий"
        onValueChange={(value) => {
          setNewComment(value);
        }}
      />
      {isTextareaActive && (
        <div className="flex gap-2 self-end">
          <Button
            variant="flat"
            onPress={() => {
              setNewComment('');
            }}>
            Отменить
          </Button>
          <Button color="primary" onPress={() => {}}>
            Отправить
          </Button>
        </div>
      )}

      {comments.length ? (
        comments.map((comment) => {
          return <Comment data={comment} />;
        })
      ) : (
        <div>Комментариев пока нет. Будьте первым!</div>
      )}
    </div>
  );
};
