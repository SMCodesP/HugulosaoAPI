import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  ButtonSubmitForgot,
  BuyerContainer,
  Container,
  FormForgotBody,
  GroupInputForgot,
  LabelInputForgot,
  ForgotForm,
  ForgotSubTitle,
  ForgotTitle,
  LogoImage,
  TextInputForgot,
  BackToLogIn,
} from '@/styles/pages/forgot-password';

import buyerImage from '@/public/buyer.svg';
import { FormEventHandler, useState } from 'react';

// import fetch from 'node-fetch';

import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { api } from '@/services/api';

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState(``);
  const router = useRouter();

  const handleSubmitResetPassword: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    try {
      console.log(`form submit reset password submit`);
      e.preventDefault();

      const response = await api.post<{
        name?: string;
      }>(`/forgot-password`, {
        email,
      });
      if (response.data.name === `NotFoundError`)
        return toast(`A conta não foi encontrada.`);

      router.push(`/forgot-password/wait`);
      toast(`Verifique as mensagens de seu e-mai.`);
      // invoke(`forgot_password`, { email });
      // console.log(fetch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ForgotForm>
        <LogoImage src="/logo.png" />
        <ForgotSubTitle>Solicite a redefinição de senha</ForgotSubTitle>
        <ForgotTitle>Esqueceu sua senha?</ForgotTitle>
        <FormForgotBody onSubmit={handleSubmitResetPassword}>
          <GroupInputForgot>
            <LabelInputForgot htmlFor="email">E-mail</LabelInputForgot>
            <TextInputForgot
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </GroupInputForgot>
          <ButtonSubmitForgot type="submit">Redefinir senha</ButtonSubmitForgot>
          <Link href="/login">
            <BackToLogIn>Voltar para login</BackToLogIn>
          </Link>
        </FormForgotBody>
      </ForgotForm>
      <BuyerContainer>
        <Image src={buyerImage} alt="Buyer image" />
      </BuyerContainer>
    </Container>
  );
};

export default ForgotPassword;
