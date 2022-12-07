import styled from 'styled-components';

export const GroupInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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

export const DefaultInputText: any = styled.textarea<TDefaultInputText>`
  border-radius: 8px;
  padding: 12px;
  resize: vertical;
  max-height: 128px;
  border: 2px solid ${({ theme }) => theme.comment};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.pink};
  font-size: 17px;
  font-family: 'Rubik', sans-serif;
  box-shadow: 0 0 8px ${({ theme }) => theme.purple}33;
  filter: brightness(${({ isActived }) => (isActived ? `100%` : `75%`)});
  transition: filter 0.4s, border-color 0.4s;

  &:focus {
    filter: brightness(100%);
    border-color: ${({ theme }) => theme.pink};
  }
`;
