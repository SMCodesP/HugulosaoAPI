import styled from 'styled-components';

import Creatable from 'react-select/creatable';

export const GroupInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  & > div {
    padding: 2px;
  }
`;

export const LabelInput = styled.label`
  font-family: 'Rubik', sans-serif;
  color: ${({ theme }) => theme.comment};
  font-size: 18px;
  font-weight: bold;
  width: fit-content;
`;

interface TDefaultInputText {
  isActived?: boolean;
}

export const DefaultSelectInput: any = styled(Creatable)<TDefaultInputText>``;
