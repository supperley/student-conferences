import { useParams } from 'react-router-dom';
import { posts } from '../../shared/data/mockData';
import { Image, Link, User } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';

const NewsPost = () => {
  const params = useParams();
  const newsId = params.newsId;
  const post = posts[newsId];

  return (
    <div className="w-full lg:px-16 mt-12">
      <div>
        <Link
          isBlock
          href="/news"
          color="foreground"
          className="text-default-500 text-small mb-5 -ml-3">
          <ArrowIcon />
          Вернуться назад
        </Link>
      </div>
      <div className="text-default-500 text-small mb-5">{formatToClientDate(post.date)}</div>
      <Link isBlock href="/news" color="foreground" className="text-default-500 text-small mb-5">
        <User
          name={post.author}
          description="Product Designer"
          avatarProps={{
            src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
          }}
        />
      </Link>
      <h1 className="mb-10 font-bold text-4xl">{post.title}</h1>
      <Image alt="NextUI hero Image" src={post.image} className="my-10" />
      <div>{post.description}</div>
    </div>
  );
};

export default NewsPost;
