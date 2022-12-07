import styled from 'styled-components';

interface TListIngredients {
  isDraggingOver: boolean;
}

export const ListIngredients = styled.ul<TListIngredients>`
  display: flex;
  flex-direction: column;
  flex: 1 0 256px;
  padding: 0 8px;
  list-style: none;
  overflow-y: auto;
`;

interface TItemIngredient {
  isDragging?: boolean;
}

export const ItemIngredient = styled.li<TItemIngredient>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.comment};
  padding: 8px 12px;
  border-radius: 8px;
  margin: 4px 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & svg {
    cursor: pointer;
    transition: filter 0.4s;

    &:hover {
      filter: brightness(75%);
    }
  }
`;
