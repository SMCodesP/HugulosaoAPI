import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { KeyedMutator } from 'swr';
import ModalNewProduct from '../Modals/ModalNewProduct';

import { ContainerNewProduct } from './styles';

const CardNewProduct: React.FC<{
  refreshProducts: KeyedMutator<TProduct[]>;
}> = ({ refreshProducts }) => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  return (
    <>
      <ModalNewProduct
        isVisible={isOpenedModal}
        onClose={() => setIsOpenedModal(false)}
        refreshProducts={refreshProducts}
      />
      <ContainerNewProduct onClick={() => setIsOpenedModal(true)}>
        <MdAdd size={42} />
      </ContainerNewProduct>
    </>
  );
};

export default CardNewProduct;
