import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/services/authApi';
import {
  selectIsAuthenticated,
  selectIsPrivileged,
  selectUser,
} from '../../redux/slices/authSlice';
import { AppLogo } from '../../shared/components/AppLogo';
import { S3_URL } from '../../shared/config/constants';
import { ROUTE_CONSTANTS } from '../../shared/config/routes';
import { Link } from '../Link/Link';
import { SwitchTheme } from '../SwitchTheme/SwitchTheme';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isPrivileged = useSelector(selectIsPrivileged);
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { label: 'Главная', link: ROUTE_CONSTANTS.HOME },
    { label: 'Новости', link: ROUTE_CONSTANTS.NEWS },
    { label: 'Конференции', link: ROUTE_CONSTANTS.CONFERENCES, auth: true },
    { label: 'Научные работы', link: ROUTE_CONSTANTS.REPORTS, auth: true },
    { label: 'Пользователи', link: ROUTE_CONSTANTS.USERS, auth: true, protected: true },
    // { label: 'Дашборд', link: ROUTE_CONSTANTS.DASHBOARD, auth: true },
  ];

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      maxWidth="2xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
        />
        <NavLink to={ROUTE_CONSTANTS.HOME}>
          <NavbarBrand>
            <AppLogo />
            <p className="ml-2 font-bold text-inherit">СНТК БНТУ</p>
          </NavbarBrand>
        </NavLink>
      </NavbarContent>
      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {menuItems.map((item, index) => {
          if (
            !item.auth ||
            (item.auth && isAuthenticated && !item.protected) ||
            (item.protected && isPrivileged)
          ) {
            return (
              <NavbarItem key={item.label}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) => {
                    if (isActive) {
                      return 'text-center block font-bold text-primary p-2';
                    }
                    return 'text-center block hover:text-gray-500 p-2';
                  }}>
                  {item.label}
                </NavLink>
              </NavbarItem>
            );
          }
        })}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => {
          if (
            !item.auth ||
            (item.auth && isAuthenticated && !item.protected) ||
            (item.protected && isPrivileged)
          ) {
            return (
              <NavbarMenuItem
                key={`${item}-${index}`}
                onClick={() => {
                  setIsMenuOpen(false);
                }}>
                <NavLink
                  className={({ isActive }) => {
                    if (isActive) {
                      return 'w-full block font-bold text-primary p-2';
                    }
                    return 'w-full block hover:text-gray-500 p-2';
                  }}
                  to={item.link}>
                  {item.label}
                </NavLink>
              </NavbarMenuItem>
            );
          }
        })}
      </NavbarMenu>
      <NavbarContent as="div" className="items-center" justify="end">
        <SwitchTheme />
        {isAuthenticated ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="default"
                name={user?.email}
                size="sm"
                src={S3_URL + user?.avatarUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                onPress={() => navigate(ROUTE_CONSTANTS.PROFILE)}>
                <p className="font-semibold">Вход выполнен как</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings" onPress={() => navigate(ROUTE_CONSTANTS.SETTINGS)}>
                Настройки
              </DropdownItem>
              <DropdownItem key="help_and_feedback" onPress={() => navigate(ROUTE_CONSTANTS.HELP)}>
                Поддержка (Помощь)
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={() => handleLogout()}>
                Выйти
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="flex">
              <Button as={Link} color="primary" href={ROUTE_CONSTANTS.LOGIN} variant="flat">
                Войти
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex lg:hidden xl:flex">
              <Link href={ROUTE_CONSTANTS.REGISTER} className="text-sm">
                Зарегистрироваться
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
