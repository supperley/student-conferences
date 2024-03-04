import {
  Navbar,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { useState } from 'react';
import { AppLogo } from '../../shared/components/AppLogo';
import { NavLink, Link as RouteLink } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../shared/config/routes';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  return (
    <Navbar isBordered maxWidth="2xl" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavLink to={ROUTE_CONSTANTS.HOME}>
          <NavbarBrand>
            <AppLogo />
            <p className="ml-2 font-bold text-inherit">SNTK BNTU</p>
          </NavbarBrand>
        </NavLink>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            to={ROUTE_CONSTANTS.HOME}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-center block font-bold text-primary p-2';
              }
              return 'text-center block hover:text-gray-500 p-2';
            }}>
            Главная
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to={ROUTE_CONSTANTS.DASHBOARD}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-center block font-bold text-primary p-2';
              }
              return 'text-center block hover:text-gray-500 p-2';
            }}>
            Dashboard
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            color="foreground"
            to={ROUTE_CONSTANTS.USERS}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-center block font-bold text-primary p-2';
              }
              return 'text-center block hover:text-gray-500 p-2';
            }}>
            Пользователи
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            color="foreground"
            to={ROUTE_CONSTANTS.NEWS}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-center block font-bold text-primary p-2';
              }
              return 'text-center block hover:text-gray-500 p-2';
            }}>
            Новости
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            color="foreground"
            to={ROUTE_CONSTANTS.REPORTS}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-center block font-bold text-primary p-2';
              }
              return 'text-center block hover:text-gray-500 p-2';
            }}>
            Научные работы
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            color="foreground"
            to={ROUTE_CONSTANTS.CONFERENCES}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-center block font-bold text-primary p-2';
              }
              return 'text-center block hover:text-gray-500 p-2';
            }}>
            Конференции
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
              }
              className="w-full"
              href="#"
              size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarContent as="div" className="items-center" justify="end">
        {isAuth ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="default"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" href={ROUTE_CONSTANTS.PROFILE}>
                <p className="font-semibold">Вход выполнен как</p>
                <p className="font-semibold">admin@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings" href={ROUTE_CONSTANTS.SETTINGS}>
                Настройки
              </DropdownItem>
              <DropdownItem key="help_and_feedback" href={ROUTE_CONSTANTS.HELP}>
                Поддержка (Помощь)
              </DropdownItem>
              <DropdownItem key="logout" color="danger" href={ROUTE_CONSTANTS.LOGOUT}>
                Выйти
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="flex">
              <Link href={ROUTE_CONSTANTS.LOGIN}>Войти</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href={ROUTE_CONSTANTS.REGISTER} variant="flat">
                Зарегистрироваться
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
