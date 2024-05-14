import { Link } from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { useGetUserByIdQuery } from '../../redux/services/userApi';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';

const User = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data, error, isLoading } = useGetUserByIdQuery(userId);

  return (
    <div className="my-10">
      <Link
        isBlock
        onClick={() => navigate(-1)}
        color="foreground"
        className="text-default-500 text-small mb-5 -ml-2">
        <ArrowIcon />
        Вернуться назад
      </Link>
      <div>
        {error ? (
          <ProfileCard />
        ) : isLoading ? (
          <ProfileCard emptyText="Загрузка..." />
        ) : data ? (
          <ProfileCard user={data} />
        ) : null}
      </div>
    </div>
  );
};

export default User;
