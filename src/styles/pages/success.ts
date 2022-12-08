import styled from 'styled-components';

export const ContainerSuccess = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  text-align: center;
  padding: 16px;
  left: 0;
  background: ${({ theme }) => theme.foreground};
`;

export const TitleSuccess = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.background};
`;

export const DescriptionSuccess = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.background};
`;
