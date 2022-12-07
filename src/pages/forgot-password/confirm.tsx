import {
  ConfirmButtonReset,
  ConfirmSubTitle,
  ConfirmTitle,
  Container,
} from '@/styles/pages/forgot-password/confirm';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ConfirmForgotPassword: NextPage = () => {
  const router = useRouter();

  return (
    <Container>
      <ConfirmTitle>Redifina sua senha</ConfirmTitle>
      <ConfirmSubTitle>
        Para redifinir sua senha você deve estar com o programa{` `}
        <span>Hugulosao</span> aberto em sua máquina.
      </ConfirmSubTitle>
      <Link href={`hugulosao://forgot-password?token=${router.query.token}`}>
        <ConfirmButtonReset>Redefinir senha</ConfirmButtonReset>
      </Link>
    </Container>
  );
};

export default ConfirmForgotPassword;
