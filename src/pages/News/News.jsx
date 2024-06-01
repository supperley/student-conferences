import { useDisclosure } from '@nextui-org/react';

import React from 'react';

import { useSelector } from 'react-redux';
import GridData from '../../components/GridData/GridData';
import NewsModal from '../../components/modal/NewsModal/NewsModal';
import { useGetAllNewsQuery } from '../../redux/services/newsApi';
import { selectIsPrivileged } from '../../redux/slices/authSlice';
import { getErrorField } from '../../shared/utils/getErrorField';

const News = () => {
  const {
    isOpen: isOpenModalAdd,
    onOpen: onOpenModalAdd,
    onOpenChange: onOpenChangeModalAdd,
  } = useDisclosure();

  const { data, error, isLoading } = useGetAllNewsQuery();

  const isPrivileged = useSelector(selectIsPrivileged);

  return (
    <>
      <div className="w-full lg:px-16 my-10">
        <div className="text-center">
          <h1 className="mb-2 font-bold text-4xl">Новости студенческих конференций</h1>
          <h5 className="text-default-500 text-lg">
            Все новости студенческих научно-технических конференций БНТУ
          </h5>
        </div>
        {error ? (
          <span>Произошла ошибка: {getErrorField(error)}</span>
        ) : isLoading ? (
          <span>Загрузка...</span>
        ) : (
          <GridData data={data} onOpenModalAdd={onOpenModalAdd} isAddButton={isPrivileged} />
        )}
      </div>
      <NewsModal
        isOpen={isOpenModalAdd}
        onOpen={onOpenModalAdd}
        onOpenChange={onOpenChangeModalAdd}
      />
    </>
  );
};

export default News;
