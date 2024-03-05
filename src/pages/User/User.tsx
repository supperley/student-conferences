import { useNavigate, useParams } from 'react-router-dom';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { users } from '../../shared/data/mockData';
import { Link } from '@nextui-org/react';
import { ArrowIcon } from '../../shared/assets/icons/ArrowIcon';

const User = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

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
        <ProfileCard user={users[userId - 1]} />
      </div>
    </div>
  );
};

export default User;
