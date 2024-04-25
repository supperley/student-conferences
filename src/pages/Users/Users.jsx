import UsersList from '../../components/UsersList/UsersList';
import { useGetAllUsersQuery } from '../../redux/services/userApi';

const Users = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();

  return error ? (
    <UsersList users={[]} emptyText={'Произошла ошибка'} />
  ) : isLoading ? (
    <UsersList users={[]} emptyText={'Загрузка...'} />
  ) : data ? (
    <UsersList users={data} />
  ) : (
    <UsersList users={[]} />
  );
};

export default Users;
