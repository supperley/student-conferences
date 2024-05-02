import { Card, CardBody, CardHeader, Divider, Link, User } from '@nextui-org/react';
import React from 'react';

const Comment = ({ data }) => {
  return (
    <Card>
      <CardHeader className="flex gap-3">
        <Link
          href={'/users/' + data?.author?._id}
          color="foreground"
          className="text-default-500 text-small">
          <User
            name={data?.author?.first_name + ' ' + data?.author?.last_name}
            description={data?.author?.position}
            avatarProps={{
              src: data?.author?.avatarUrl,
            }}
          />
        </Link>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{data?.text}</p>
      </CardBody>
    </Card>
  );
};

export default Comment;
