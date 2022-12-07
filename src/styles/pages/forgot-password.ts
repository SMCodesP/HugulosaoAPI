import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ForgotForm = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.background};
  box-shadow: 0 0 50px ${({ theme }) => theme.comment}55;
  border-radius: 40px;
  width: 60%;
  padding: 50px;
`;

export const LogoImage = styled.img`
  width: 125px;
`;

export const ForgotSubTitle = styled.h2`
  font-weight: 700;
  font-size: 18px;
  margin-top: 35px;
  color: ${({ theme }) => theme.purple};
`;

export const ForgotTitle = styled.h1`
  font-weight: bold;
  font-size: 42px;
`;

export const FormForgotBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 25px;
`;

export const GroupInputForgot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const LabelInputForgot = styled.label`
  font-weight: 500;
  font-size: 18px;
`;

export const TextInputForgot = styled.input`
  padding: 12px 15px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.currentLine};
  border: 2px solid ${({ theme }) => theme.comment};
  color: ${({ theme }) => theme.foreground};
  border-radius: 8px;
  box-shadow: 0 0 10px ${({ theme }) => theme.comment}99;
  transition: border 0.4s;

  &:focus {
    border: 2px solid ${({ theme }) => theme.pink};
  }
`;

export const BackToLogIn = styled.a`
  width: fit-content;
  color: ${({ theme }) => theme.comment};
  font-weight: bold;
  cursor: pointer;
  transition: color 0.4s;

  &:hover {
    color: ${({ theme }) => theme.purple};
  }
`;

export const ButtonSubmitForgot = styled.button`
  width: 75%;
  align-self: center;
  font-family: 'Rubik';
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.pink};
  background-color: transparent;
  color: ${({ theme }) => theme.pink};
  box-shadow: 0 0 10px ${({ theme }) => theme.comment}99;
  transition: border, color, background-color 0.4s;

  &:hover {
    background-color: ${({ theme }) => theme.pink};
    border: 2px solid ${({ theme }) => theme.background};
    box-shadow: 0 0 20px ${({ theme }) => theme.comment}99;
    color: ${({ theme }) => theme.background};
  }
`;

export const BuyerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.orange},
    ${({ theme }) => theme.background} 85%
  );

  & img {
    filter: brightness(105%);
  }

  & span,
  & img {
    height: 87.5% !important;
  }
`;
