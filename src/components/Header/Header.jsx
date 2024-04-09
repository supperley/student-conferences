import {
  Navbar,
  NavbarContent,
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
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../shared/config/routes';
import { SwitchTheme } from '../../features/theme/switchTheme/ui/SwitchTheme';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Главная', link: ROUTE_CONSTANTS.HOME },
    { label: 'Новости', link: ROUTE_CONSTANTS.NEWS },
    { label: 'Конференции', link: ROUTE_CONSTANTS.CONFERENCES },
    { label: 'Научные работы', link: ROUTE_CONSTANTS.REPORTS },
    { label: 'Пользователи', link: ROUTE_CONSTANTS.USERS },
    { label: 'Дашборд', link: ROUTE_CONSTANTS.DASHBOARD },
  ];

  return (
    <Navbar isBordered shouldHideOnScroll maxWidth="2xl" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
        />
        <NavLink to={ROUTE_CONSTANTS.HOME}>
          <NavbarBrand>
            <AppLogo />
            <p className="ml-2 font-bold text-inherit">SNTK BNTU</p>
          </NavbarBrand>
        </NavLink>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
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
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} onClick={() => setIsMenuOpen(false)}>
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
        ))}
      </NavbarMenu>
      <NavbarContent as="div" className="items-center" justify="end">
        <SwitchTheme />
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
              <DropdownItem
                key="profile"
                className="h-14 gap-2"
                onPress={() => navigate(ROUTE_CONSTANTS.PROFILE)}>
                <p className="font-semibold">Вход выполнен как</p>
                <p className="font-semibold">admin@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings" onPress={() => navigate(ROUTE_CONSTANTS.SETTINGS)}>
                Настройки
              </DropdownItem>
              <DropdownItem key="help_and_feedback" onPress={() => navigate(ROUTE_CONSTANTS.HELP)}>
                Поддержка (Помощь)
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={() => navigate(ROUTE_CONSTANTS.LOGOUT)}>
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
