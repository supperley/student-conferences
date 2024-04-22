import { Card, CardBody, CardHeader, Divider, Link, User } from '@nextui-org/react';
import React from 'react';

const Comment = () => {
  return (
    <Card>
      <CardHeader className="flex gap-3">
        <Link href="/news" color="foreground" className="text-default-500 text-small">
          <User
            name={'Test'}
            description="Product Designer"
            avatarProps={{
              src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
            }}
          />
        </Link>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
};

export default Comment;
