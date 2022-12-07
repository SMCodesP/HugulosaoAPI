import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const ConfirmTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  font-family: 'Rubik';
`;

export const ConfirmSubTitle = styled.h2`
  font-size: 22px;
  font-weight: 500;
  width: 35%;
  text-align: center;
`;

export const ConfirmButtonReset = styled.button`
  font-family: 'Rubik';
  font-size: 22px;
  font-weight: bold;
  padding: 12px 50px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.pink};
  border: 3px solid ${({ theme }) => theme.pink};
  box-shadow: 0 0 5px ${({ theme }) => theme.purple};
  border-radius: 12px;
  cursor: pointer;
  transition-duration: 0.4s;
  transition-property: border, background-color, color, box-shadow;

  &:hover {
    background-color: ${({ theme }) => theme.pink};
    color: ${({ theme }) => theme.background};
    border: 3px solid ${({ theme }) => theme.background};
    box-shadow: 0 0 10px ${({ theme }) => theme.purple};
  }
`;
