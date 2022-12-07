import { FormEventHandler, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import buyerImage from '@/public/buyer.svg';

import {
  Container,
  ResetForm,
  BackToLogIn,
  ButtonSubmitReset,
  BuyerContainer,
  FormResetBody,
  GroupInputReset,
  LabelInputReset,
  LogoImage,
  ResetSubTitle,
  ResetTitle,
  TextInputReset,
} from '@/styles/pages/reset';

import { toast } from 'react-toastify';

const ForgotPasswordReset: React.FC = () => {
  const [password, setPassword] = useState(``);
  const [confirmPassword, setConfirmPassword] = useState(``);

  const router = useRouter();

  const handleSubmitResetPassword: FormEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();

    if (password !== confirmPassword)
      return toast(`As senhas devem ser iguais.`);

    router.push(`/login`);
    toast(`Senha alterada com sucesso!`);
  };

  return (
    <Container>
      <ResetForm>
        <LogoImage src="/logo.png" />
        <ResetSubTitle>Redefina sua senha</ResetSubTitle>
        <ResetTitle>Cria uma nova senha</ResetTitle>
        <FormResetBody onSubmit={handleSubmitResetPassword}>
          <GroupInputReset>
            <LabelInputReset htmlFor="password">Senha</LabelInputReset>
            <TextInputReset
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </GroupInputReset>
          <GroupInputReset>
            <LabelInputReset htmlFor="confirm-password">
              Confirme sua senha
            </LabelInputReset>
            <TextInputReset
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </GroupInputReset>
          <ButtonSubmitReset>Redefinir senha</ButtonSubmitReset>
          <Link href="/login">
            <BackToLogIn>Voltar para login</BackToLogIn>
          </Link>
        </FormResetBody>
      </ResetForm>
      <BuyerContainer>
        <Image src={buyerImage} alt="Buyer image" />
      </BuyerContainer>
    </Container>
  );
};

export default ForgotPasswordReset;
