import { Card, CardBody, CardHeader, Divider, Link, User } from '@nextui-org/react';
import React from 'react';
import { S3_URL } from '../../shared/config/constants';

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
              src: S3_URL + data?.author?.avatarUrl,
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
