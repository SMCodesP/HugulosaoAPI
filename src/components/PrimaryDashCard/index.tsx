import { HiDotsVertical } from 'react-icons/hi';
import { useTheme } from 'styled-components';

import Chart from './Chart';

import { Container, Header, Menu, Title, SubTitle } from './styles';

const PrimaryDashCard: React.FC<{
  value: string;
  subTitle: string;
  color?: string;
  days: {
    [key: string]: any;
  };
}> = ({ value, days, subTitle, color }) => {
  const theme = useTheme();

  if (!color) {
    color = theme.cyan;
  }

  return (
    <Container color={color}>
      <Header>
        <Title>{value}</Title>
        <Menu>
          <HiDotsVertical size={20} color={theme.currentLine} />
        </Menu>
      </Header>
      <SubTitle>{subTitle}</SubTitle>
      <Chart days={days} />
    </Container>
  );
};

export default PrimaryDashCard;
