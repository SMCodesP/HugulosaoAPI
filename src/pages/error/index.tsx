import {
  ContainerSuccess,
  DescriptionSuccess,
  TitleSuccess,
} from '@/styles/pages/success';

const Success: React.FC = () => {
  return (
    <ContainerSuccess>
      <TitleSuccess>A tentativa de compra falhou!</TitleSuccess>
      <DescriptionSuccess>
        Volte em nosso aplicative e tente novamente realizar sua compra.
      </DescriptionSuccess>
    </ContainerSuccess>
  );
};

export default Success;
