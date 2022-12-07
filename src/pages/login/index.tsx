import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FormEventHandler, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/contexts/auth';

import {
  ButtonSubmitLogin,
  BuyerContainer,
  Container,
  ForgotPassword,
  FormLoginBody,
  GroupInputLogin,
  LabelInputLogin,
  LoginForm,
  LoginSubTitle,
  LoginTitle,
  LogoImage,
  TextInputLogin,
} from '@/styles/pages/login';

import buyerImage from '@/public/buyer.svg';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const { signIn, accessToken, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && accessToken) {
      router.push(`/`);
    }
  }, [router, accessToken, isLoaded]);

  const onSubmitLogin = useCallback<FormEventHandler<HTMLDivElement>>(
    async (event) => {
      event.preventDefault();
      await signIn({
        email,
        password,
      });
    },
    [signIn, email, password],
  );

  if (!isLoaded || accessToken) {
    return <div />;
  }

  return (
    <Container>
      <LoginForm onSubmit={onSubmitLogin}>
        <LogoImage src="/logo.png" />
        <LoginSubTitle>Bem-vindo novamente!</LoginSubTitle>
        <LoginTitle>Faça seu login</LoginTitle>
        <FormLoginBody>
          <GroupInputLogin>
            <LabelInputLogin htmlFor="email">E-mail</LabelInputLogin>
            <TextInputLogin
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </GroupInputLogin>
          <GroupInputLogin>
            <LabelInputLogin htmlFor="password">Senha</LabelInputLogin>
            <TextInputLogin
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </GroupInputLogin>
          <ButtonSubmitLogin>Entrar</ButtonSubmitLogin>
          <Link href="/forgot-password">
            <ForgotPassword>Esqueceu sua senha?</ForgotPassword>
          </Link>
        </FormLoginBody>
      </LoginForm>
      <BuyerContainer>
        <Image src={buyerImage} alt="Buyer image" />
      </BuyerContainer>
    </Container>
  );
};

export default Login;
