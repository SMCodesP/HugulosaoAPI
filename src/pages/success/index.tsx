import {
  ContainerSuccess,
  DescriptionSuccess,
  TitleSuccess,
} from '@/styles/pages/success';

const Success: React.FC = () => {
  return (
    <ContainerSuccess>
      <TitleSuccess>Compra realizada com sucesso!</TitleSuccess>
      <DescriptionSuccess>
        Você já pode voltar para o aplicativo, sua compra foi confirmada e
        realizada com sucesso, aguarde a confirmação e novas atualizações.
      </DescriptionSuccess>
    </ContainerSuccess>
  );
};

export default Success;
