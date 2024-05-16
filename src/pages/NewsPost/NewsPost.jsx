import { Button, Image, Skeleton, User, useDisclosure } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from '../../components/Link/Link';
import DeleteNewsModal from '../../components/modal/DeleteNewsModal/DeleteNewsModal';
import NewsModal from '../../components/modal/NewsModal/NewsModal';
import { useGetNewsByIdQuery } from '../../redux/services/newsApi';
import { selectUser } from '../../redux/slices/authSlice';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import defaultReport from '../../shared/assets/images/default-report.jpg';
import { S3_URL } from '../../shared/config/constants';
import { ROUTE_CONSTANTS } from '../../shared/config/routes';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';

const NewsPost = () => {
  const params = useParams();
  const newsId = params.newsId;
  const { data: newsData, isLoading } = useGetNewsByIdQuery(newsId);
  const user = useSelector(selectUser);
  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onOpenChange: onOpenChangeModalDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();

  return (
    <>
      <div className="w-full lg:px-16 my-10 flex flex-col gap-4">
        <div>
          <Link
            isBlock
            href={ROUTE_CONSTANTS.NEWS}
            color="foreground"
            className="text-default-500 text-small -ml-3">
            <ArrowIcon />
            Вернуться назад
          </Link>
        </div>
        <div className="text-default-500 text-small">
          {formatToClientDate(newsData?.createdAt, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div>
          <Link
            isBlock
            href={'/users/' + newsData?.author._id}
            color="foreground"
            className="text-default-500 text-small">
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              <User
                name={newsData?.author.first_name + ' ' + newsData?.author.last_name}
                description={newsData?.author.position}
                avatarProps={{
                  src: S3_URL + newsData?.author.avatarUrl,
                }}
              />
            </Skeleton>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <h1 className="font-bold text-4xl">
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              {newsData?.title}
            </Skeleton>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            {!isLoading && (user?._id === newsData?.author?._id || user?.role === 'admin') && (
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  onOpenModalDelete();
                }}>
                Удалить новость
              </Button>
            )}
            {!isLoading && (user?._id === newsData?.author?._id || user?.role === 'admin') && (
              <Button
                color="primary"
                variant="flat"
                onPress={() => {
                  onOpenModalEdit();
                }}>
                Редактировать
              </Button>
            )}
          </div>
        </div>
        <div className="max-w-[90%] self-center my-5">
          <Skeleton isLoaded={!isLoading} className={`rounded-lg ${isLoading}`}>
            <Image
              className="max-h-[500px]"
              alt="NextUI hero Image"
              src={newsData?.imageUrl ? S3_URL + newsData?.imageUrl : defaultReport}
            />
          </Skeleton>
        </div>
        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          <div>{newsData?.description}</div>
        </Skeleton>
      </div>
      <DeleteNewsModal
        isOpen={isOpenModalDelete}
        onOpen={onOpenModalDelete}
        onOpenChange={onOpenChangeModalDelete}
        news={newsData}
      />
      <NewsModal
        isOpen={isOpenModalEdit}
        onOpen={onOpenModalEdit}
        onOpenChange={onOpenChangeModalEdit}
        news={newsData}
        mode={'edit'}
      />
    </>
  );
};

export default NewsPost;
