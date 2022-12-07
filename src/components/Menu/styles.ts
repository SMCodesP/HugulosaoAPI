import Image from 'next/image';
import { darken } from 'polished';
import styled from 'styled-components';

export const ContainerMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  box-shadow: 0 0 8px ${({ theme }) => theme.comment};
  width: 92px;
  height: 75%;
  padding: 32px 0;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto 0;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const UserAvatar = styled(Image)`
  align-self: center;
  border-radius: 42px;
  cursor: pointer;
  transition: filter 0.4s;

  &:hover {
    filter: brightness(75%);
  }
`;

export const ListPage = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 42px 0;
`;

interface TItemPage {
  isActive?: boolean;
  color?: string;
  iconColor?: string;
  iconColorActive?: string;
}

export const ItemPage = styled.li<TItemPage>`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, isActive, color }) =>
    isActive
      ? color
        ? color
        : darken(0.025, theme.background)
      : theme.background};
  cursor: pointer;
  color: ${({ theme, isActive, iconColorActive, iconColor }) =>
    isActive
      ? iconColorActive
        ? iconColorActive
        : theme.pink
      : iconColor
      ? iconColor
      : theme.comment};
  border-top: 1px solid transparent;
  transition: color 0.4s, background 0.4s, border-color 0.4s;

  &:hover {
    background: ${({ theme, color }) =>
      color ? color : darken(0.025, theme.background)};
    color: ${({ theme, iconColorActive }) =>
      iconColorActive ? iconColorActive : theme.pink};
  }
`;
