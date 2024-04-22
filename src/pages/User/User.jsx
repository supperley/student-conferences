import { useNavigate, useParams } from 'react-router-dom';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { Link } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';
import { useGetUserByIdQuery } from '../../redux/services/userApi';

const User = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data, error, isLoading } = useGetUserByIdQuery(userId);

  return error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <>Loading...</>
  ) : data ? (
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
        <ProfileCard user={data} />
      </div>
    </div>
  ) : null;
};

export default User;
