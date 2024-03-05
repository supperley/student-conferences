import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { profile } from '../../shared/data/mockData';

const Profile = () => {
  return (
    <div className="my-10">
      <ProfileCard user={profile} isPersonal />
    </div>
  );
};

export default Profile;
