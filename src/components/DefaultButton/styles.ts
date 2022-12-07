import styled from 'styled-components';

export const DefaultStyledButton = styled.button`
  font-family: 'Rubik';
  font-size: 16px;
  font-weight: 500;
  padding: 10px 16px;
  background: none;
  border: 2px solid ${({ theme, color }) => (color ? color : theme.pink)};
  border-radius: 8px;
  color: ${({ theme, color }) => (color ? color : theme.pink)}ee;
  cursor: pointer;
  transition: background 0.4s, color 0.4s;

  &:hover {
    background: ${({ theme, color }) => (color ? color : theme.pink)}33;
    color: ${({ theme, color }) => (color ? color : theme.pink)};
  }
`;
