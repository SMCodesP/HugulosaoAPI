import Image from 'next/image';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { Form } from '@unform/web';

export const StyledModal: any = Modal.styled`
  width: 45%;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  padding: 18px;
  height: 85%;
  background-color: ${({ theme }: any) => theme.background};
  box-shadow: 0 0 12px ${({ theme }: any) => theme.currentLine}22;
`;

export const TitleModal = styled.h1`
  font-size: 2rem;
`;

export const ContainerForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
  overflow-y: auto;
`;

export const ContainerImageListIngredients = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

export const ContainerColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const HeaderTitleIngredients = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NewIngredient = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 42px;
  font-size: 32px;
  font-weight: 900;
  color: ${({ theme }) => theme.pink};
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: background 0.4s;

  &:hover {
    background: ${({ theme }) => theme.comment}33;
  }
`;

export const UploadImage = styled.label`
  display: flex;
  border: 4px dashed ${({ theme }) => theme.comment};
  color: ${({ theme }) => theme.comment};
  flex: 0 0 256px;
  width: 256px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: filter 0.4s;

  &:hover {
    filter: brightness(75%);
  }
`;

export const ImagePreview = styled(Image)`
  border-radius: 18px;
`;

export const GroupInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const GroupButton = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 8px;
`;
