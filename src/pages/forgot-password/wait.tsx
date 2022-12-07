import { NextPage } from 'next';
import Image from 'next/image';

import {
  BuyerContainer,
  Container,
  ForgotForm,
  ForgotSubTitle,
  ForgotTitle,
  LogoImage,
} from '@/styles/pages/forgot-password';

import buyerImage from '@/public/buyer.svg';

const WaitConfirmation: NextPage = () => {
  return (
    <Container>
      <ForgotForm>
        <LogoImage src="/logo.png" />
        <ForgotSubTitle>Confirme a redefinição de senha</ForgotSubTitle>
        <ForgotTitle>Acesse seu e-mail</ForgotTitle>
        <ForgotSubTitle>
          Verifique sua caixa de entrada, enviamos para seu e-mail um link para
          a confirmação de redefinição de senha, para redefinir abra o link com
          o programa aberto.
        </ForgotSubTitle>
      </ForgotForm>
      <BuyerContainer>
        <Image src={buyerImage} alt="Buyer image" />
      </BuyerContainer>
    </Container>
  );
};

export default WaitConfirmation;
