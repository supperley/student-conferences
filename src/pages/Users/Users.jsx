import UsersList from '../../components/UsersList/UsersList';
import { useGetAllUsersQuery } from '../../redux/services/userApi';

const Users = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();

  return error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <>Loading...</>
  ) : data ? (
    <UsersList users={data} />
  ) : null;
};

export default Users;
