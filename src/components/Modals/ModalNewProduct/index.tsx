import { ChangeEventHandler, useEffect, useState } from 'react';

import { SubmitHandler } from '@unform/core';

import { FaCamera } from 'react-icons/fa';

import {
  ContainerColumn,
  ContainerForm,
  ContainerImageListIngredients,
  GroupButton,
  GroupInputs,
  HeaderTitleIngredients,
  ImagePreview,
  NewIngredient,
  StyledModal,
  TitleModal,
  UploadImage,
} from './styles';
import TextInput from '@/components/DefaultInputs/TextInput';
import TextEdit from '@/components/DefaultInputs/TextEdit';
import SelectInput from '@/components/DefaultInputs/SelectInput';
import DefaultButton from '@/components/DefaultButton';
import { useTheme } from 'styled-components';
import DragIngredients from './DragIngredients';
import ModalNewIngredient from '../ModalNewIngredient';
import { api } from '@/services/api';
import NumberInput from '@/components/DefaultInputs/NumberInput';
import { toast } from 'react-toastify';
import useSWR, { KeyedMutator } from 'swr';

const ModalNewProduct: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  refreshProducts: KeyedMutator<TProduct[]>;
}> = ({ isVisible, onClose, refreshProducts }) => {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(``);
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isOpenNewIngredient, setIsOpenNewIngredient] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const { data: categories } = useSWR<TCategory[]>(`/category`);

  const theme = useTheme();

  useEffect(() => {
    if (productImage) {
      const objectUrl = URL.createObjectURL(productImage);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [productImage]);

  const onSelectImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setProductImage(null);
      return;
    }
    setProductImage(e.target.files[0]);
  };

  const onSubmitNewProduct: SubmitHandler<any> = async (data, { reset }) => {
    try {
      if (!productImage)
        throw new Error(`Você deve selecionar uma imagem para o produto`);

      const formData = new FormData();
      formData.append(`thumbnail`, productImage);

      const { data: thumbnailUploaded } = await api.post(
        `/thumbnail`,
        formData,
      );

      await api.post(`/product`, {
        name: data.name,
        thumbnail: thumbnailUploaded.url,
        description: data.description,
        price: data.price,
        ingredients: ingredients.map(({ name, isLocked }: any) => ({
          name,
          isLocked,
        })),
        category: data.category.value,
      });

      toast(`Produto criado com sucesso!`, {
        type: `success`,
      });
      reset();
      onClose();
      await refreshProducts();
    } catch (error) {
      console.log(error);
      toast(`Não foi possível criar o produto, tente novamente.`, {
        type: `error`,
      });
    }
  };

  const addNewIngredient = (name: string) => {
    setIngredients((state) => [
      ...state,
      {
        id: String(new Date().getTime()),
        name,
        isLocked: false,
      },
    ]);
  };

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  };

  const beforeClose = () => {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 400);
    });
  };

  return (
    <StyledModal
      isOpen={isVisible}
      onBackgroundClick={onClose}
      onEscapeKeydown={onClose}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
      opacity={opacity}
      backgroundProps={{ opacity }}
    >
      <ModalNewIngredient
        isOpen={isOpenNewIngredient}
        addIngredient={addNewIngredient}
        closeModal={() => setIsOpenNewIngredient(false)}
      />
      <ContainerForm onSubmit={onSubmitNewProduct}>
        <ContainerImageListIngredients>
          <ContainerColumn>
            <TitleModal>Novo produto</TitleModal>
            <UploadImage htmlFor="image">
              {preview ? (
                <ImagePreview src={preview} alt="Preview image product" fill />
              ) : (
                <FaCamera size={42} />
              )}
            </UploadImage>
          </ContainerColumn>

          <ContainerColumn>
            <HeaderTitleIngredients>
              <TitleModal>Ingredientes</TitleModal>
              <NewIngredient onClick={() => setIsOpenNewIngredient(true)}>
                +
              </NewIngredient>
            </HeaderTitleIngredients>
            <DragIngredients
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </ContainerColumn>
        </ContainerImageListIngredients>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={onSelectImage}
          hidden
        />
        <GroupInputs>
          <TextInput
            name="name"
            placeholder="Digite o nome do lanche"
            label="Nome:"
            required
          />
          <NumberInput
            name="price"
            placeholder="Digite o valor do lanche"
            label="Valor:"
            type="number"
            step={0.01}
            required
          />
        </GroupInputs>
        <SelectInput
          name="category"
          label="Categoria:"
          options={categories?.map((category) => ({
            value: category.name,
            label: category.name,
          }))}
        />
        <TextEdit
          name="description"
          placeholder="Digite uma descrição para lanche"
          label="Descrição:"
          required
        />
        <GroupButton>
          <DefaultButton onClick={onClose} color={theme.red} text="Cancelar" />
          <DefaultButton type="submit" text="Salvar" />
        </GroupButton>
      </ContainerForm>
    </StyledModal>
  );
};

export default ModalNewProduct;
