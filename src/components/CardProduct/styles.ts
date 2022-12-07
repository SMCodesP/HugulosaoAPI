import Image from 'next/image';
import styled from 'styled-components';

export const ContainerProduct = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 8px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.comment};
  box-shadow: 0 0 4px ${({ theme }) => theme.comment};
  cursor: pointer;
  transition: filter 0.4s;

  &:hover {
    filter: brightness(75%);
  }
`;

export const ProductImage = styled(Image)`
  border-radius: 24px;
  align-self: center;
  width: 100%;
  height: auto;
  filter: brightness(75%);
  box-shadow: 0 0 8px ${({ theme }) => theme.background};
`;

export const ContainerData = styled.div`
  padding: 4px 8px;
`;

export const TitleProduct = styled.p`
  font-size: 18px;
  font-weight: 900;
  color: ${({ theme }) => theme.foreground};
`;

export const InformationProduct = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
`;

export const ValueProduct = styled.p`
  color: ${({ theme }) => theme.green};
  font-weight: 600;
`;

export const RatingsProduct = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.yellow};
  font-weight: 600;
`;
