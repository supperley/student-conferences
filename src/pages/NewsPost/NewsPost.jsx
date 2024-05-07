import { useParams } from 'react-router-dom';
import { Button, Image, Link, Skeleton, User, useDisclosure } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { formatToClientDate } from '../../shared/utils/formatToClientDate';
import { ROUTE_CONSTANTS } from '../../shared/config/routes';
import { useGetNewsByIdQuery, useUpdateNewsMutation } from '../../redux/services/newsApi';
import { S3_URL } from '../../shared/config/constants';
import defaultReport from '../../shared/assets/images/default-report.jpg';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { useState } from 'react';
import DeleteNewsModal from '../../components/modal/DeleteNewsModal/DeleteNewsModal';
import NewsModal from '../../components/modal/NewsModal/NewsModal';

const NewsPost = () => {
  const params = useParams();
  const newsId = params.newsId;
  const { data: newsData, error, isLoading } = useGetNewsByIdQuery(newsId);
  const user = useSelector(selectUser);
  const [updateNews, { isLoading: isUpdateLoading }] = useUpdateNewsMutation();
  const {
    isOpen: isOpenModalCancel,
    onOpen: onOpenModalCancel,
    onOpenChange: onOpenChangeModalCancel,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();

  return (
    <>
      <div className="w-full lg:px-16 my-10">
        <div>
          <Link
            isBlock
            href={ROUTE_CONSTANTS.NEWS}
            color="foreground"
            className="text-default-500 text-small mb-5 -ml-3">
            <ArrowIcon />
            Вернуться назад
          </Link>
        </div>
        <div className="text-default-500 text-small mb-5">
          {formatToClientDate(newsData?.date, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <Link
          isBlock
          href={'/users/' + newsData?.author._id}
          color="foreground"
          className="text-default-500 text-small mb-5">
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
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <h1 className="mb-10 font-bold text-4xl">
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              {newsData?.title}
            </Skeleton>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            {(user?._id === newsData?.author?._id || user?.role === 'admin') && (
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  onOpenModalCancel();
                }}>
                Удалить новость
              </Button>
            )}
            {(user?._id === newsData?.author?._id || user?.role === 'admin') && (
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
        <Skeleton isLoaded={!isLoading} className={`rounded-lg ${isLoading}`}>
          <Image
            alt="NextUI hero Image"
            src={newsData?.imageUrl ? S3_URL + newsData?.imageUrl : defaultReport}
          />
        </Skeleton>
        <Skeleton isLoaded={!isLoading} className="rounded-lg my-10">
          <div>{newsData?.description}</div>
        </Skeleton>
      </div>
      <DeleteNewsModal
        isOpen={isOpenModalCancel}
        onOpen={onOpenModalCancel}
        onOpenChange={onOpenChangeModalCancel}
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
