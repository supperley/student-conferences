import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { profile } from '../../shared/data/mockData';

const Profile = () => {
  return (
    <div className="mt-10">
      <ProfileCard profile={profile} />
    </div>
  );
};

export default Profile;