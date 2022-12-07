import styled from 'styled-components';

export const ContainerNewProduct = styled.div`
  border: 4px dashed ${({ theme }) => theme.comment};
  color: ${({ theme }) => theme.comment};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  cursor: pointer;
  transition: filter 0.4s;

  &:hover {
    filter: brightness(75%);
  }
`;
