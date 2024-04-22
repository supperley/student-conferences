import { useSelector } from 'react-redux';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
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
