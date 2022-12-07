import Link from 'next/link';

import { useAuth } from '@/contexts/auth';

import { TbDashboard, TbLogout, TbUsers } from 'react-icons/tb';
import { RiFileList3Line } from 'react-icons/ri';

import { useTheme } from 'styled-components';

import defaultAvatar from '@/public/default-avatar.png';

import { ContainerMenu, ItemPage, ListPage, UserAvatar } from './styles';

const pages = [
  {
    name: `home`,
    page: `/`,
    icon: TbDashboard,
  },
  {
    name: `products`,
    page: `/products`,
    icon: RiFileList3Line,
  },
  {
    name: `users`,
    page: `/users`,
    icon: TbUsers,
  },
];

const Menu: React.FC<{
  active?: string;
}> = ({ active }) => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <ContainerMenu>
      <UserAvatar
        src={user?.avatar || defaultAvatar}
        width={48}
        height={48}
        alt="User avatar"
      />
      <ListPage>
        {pages.map((page) => (
          <Link key={page.name} href={page.page} style={{ width: `100%` }}>
            <ItemPage isActive={page.name === active}>
              <page.icon size={32} />
            </ItemPage>
          </Link>
        ))}
      </ListPage>
      <ItemPage
        color={theme.red}
        iconColor={theme.red}
        iconColorActive={theme.foreground}
      >
        <TbLogout size={32} />
      </ItemPage>
    </ContainerMenu>
  );
};

export default Menu;
