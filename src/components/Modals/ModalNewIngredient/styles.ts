import Modal from 'styled-react-modal';

export const StyledModalIngredient = Modal.styled`
  width: 40%;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  background-color: ${({ theme }: any) => theme.background};
`;
