import TextInput from '@/components/DefaultInputs/TextInput';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React from 'react';

import { StyledModalIngredient } from './styles';

const ModalNewIngredient: React.FC<{
  isOpen: boolean;
  closeModal: () => void;
  addIngredient: (name: string) => void;
}> = ({ isOpen, addIngredient, closeModal }) => {
  const onSubmitNewIngredient: SubmitHandler<any> = (data) => {
    addIngredient(data[`new-ingredient`]);
    closeModal();
  };

  return (
    <StyledModalIngredient
      isOpen={isOpen}
      onEscapeKeydown={closeModal}
      onBackgroundClick={closeModal}
    >
      <Form onSubmit={onSubmitNewIngredient}>
        <TextInput
          name="new-ingredient"
          placeholder="Digite o nome do novo ingrediente"
          autoFocus
        />
      </Form>
    </StyledModalIngredient>
  );
};

export default ModalNewIngredient;
