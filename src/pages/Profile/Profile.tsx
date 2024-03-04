import { ProfileCard } from '../../components/ProfileCard/ProfileCard';

const Profile = () => {
  return (
    <div className="mt-10">
      <ProfileCard
        profile={{
          description: 'profile description',
          title: 'Ivan Ivanov',
          date: '2022-08-12T20:17:46.384Z',
        }}
      />
    </div>
  );
};

export default Profile;
