import { useSelector } from 'react-redux';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { profile } from '../../shared/data/mockData';
import { selectUser } from '../../redux/slices/authSlice';

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <div className="my-10">
      <ProfileCard user={user} isPersonal />
    </div>
  );
};

export default Profile;
