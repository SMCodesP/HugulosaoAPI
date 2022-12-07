import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPage } from 'next';

import { useAuth } from '@/contexts/auth';

import Menu from '@/components/Menu';
import { Title } from '@/styles/pages/home';
import { ContainerData, ContainerPage } from '@/styles/pages/geral';
import { useTheme } from 'styled-components';
import PrimaryDashCard from '@/components/PrimaryDashCard';
import { formatCurrency } from '@/utils/formatCurrency';

const Home: NextPage = () => {
  const { accessToken, isLoaded } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (isLoaded && !accessToken) {
      router.push(`/login`);
    }
  }, [router, isLoaded, accessToken]);

  if (!isLoaded && !accessToken) {
    return <div />;
  }

  return (
    <>
      <Menu active="home" />

      <ContainerPage>
        <Title>Painel de Controle</Title>

        <ContainerData>
          <PrimaryDashCard
            value="102 unidades"
            subTitle="Vendas"
            days={{
              DOM: { label: 75, value: 75 },
              SEG: { label: 87, value: 87 },
              TERÇ: { label: 25, value: 25 },
              QUA: { label: 78, value: 78 },
              QUI: { label: 16, value: 16 },
              SEX: { label: 40, value: 40 },
              SÁB: { label: 98, value: 98 },
            }}
            color={theme.pink}
          />
          <PrimaryDashCard
            value={formatCurrency(1200)}
            subTitle="Ganhos"
            days={{
              DOM: {
                label: formatCurrency(28 * 100),
                value: 28 * 100,
              },
              SEG: {
                label: formatCurrency(18 * 100),
                value: 18 * 100,
              },
              TERÇ: {
                label: formatCurrency(0 * 100),
                value: 0 * 100,
              },
              QUA: {
                label: formatCurrency(30 * 100),
                value: 30 * 100,
              },
              QUI: {
                label: formatCurrency(16 * 100),
                value: 16 * 100,
              },
              SEX: {
                label: formatCurrency(35 * 100),
                value: 35 * 100,
              },
              SÁB: {
                label: formatCurrency(37 * 100),
                value: 37 * 100,
              },
            }}
            color={theme.cyan}
          />
        </ContainerData>
      </ContainerPage>
    </>
  );
};

export default Home;
