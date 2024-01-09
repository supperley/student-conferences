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
import { NavLink } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../shared/config/routes';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AppLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            to={ROUTE_CONSTANTS.HOME}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-center block font-bold text-blue-500 p-2';
              }
              return 'text-center block border-blue-500 p-2';
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
                return 'text-center block font-bold text-blue-500 p-2';
              }
              return 'text-center block border-blue-500 p-2';
            }}>
            Users
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            color="foreground"
            to={ROUTE_CONSTANTS.BLOG}
            className={({ isActive }) => {
              if (isActive) {
                return 'text-center block font-bold text-blue-500 p-2';
              }
              return 'text-center block border-blue-500 p-2';
            }}>
            Blog
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
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          // startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
};

// const Header = ({ isWideScreen, setIsAsideOpen }) => {
//   return (
//     <header className={styles.container}>
//       <div className={styles.buttonsContainer}>
//         {!isWideScreen && (
//           <IconButton
//             className={styles.menuContainer}
//             onClick={() => {
//               setIsAsideOpen((value) => !value);
//             }}>
//             <FontAwesomeIcon icon={faBars} />
//           </IconButton>
//         )}
//         <button className={styles.buttonSearch}>
//           <FontAwesomeIcon icon={faSearch} />
//         </button>
//       </div>
//       <Stack direction="row" alignItems="center" spacing={1}>
//         <ChangeLanguage />
//         <button className={styles.buttonNotification}>
//           <FontAwesomeIcon icon={faBell} />
//         </button>
//         <button className={styles.buttonProfile}>
//           <FontAwesomeIcon icon={faUser} />
//         </button>
//       </Stack>
//     </header>
//   );
// };

export default Header;
