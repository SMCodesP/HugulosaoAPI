import { formatCurrency } from '@/utils/formatCurrency';
import { useState } from 'react';
import { HiStar } from 'react-icons/hi';
import { KeyedMutator } from 'swr';
import ModalEditProduct from '../Modals/ModalEditProduct';
import {
  ContainerData,
  ContainerProduct,
  InformationProduct,
  ProductImage,
  RatingsProduct,
  TitleProduct,
  ValueProduct,
} from './styles';

const CardProduct: React.FC<{
  product: TProduct;
  refreshProducts: KeyedMutator<TProduct[]>;
}> = ({ product, refreshProducts }) => {
  const [isOpenedEdit, setIsOpenedEdit] = useState(false);

  return (
    <>
      <ModalEditProduct
        refreshProducts={refreshProducts}
        product={product}
        isVisible={isOpenedEdit}
        onClose={() => setIsOpenedEdit(false)}
      />
      <ContainerProduct onClick={() => setIsOpenedEdit(true)}>
        <ProductImage
          width={256}
          height={256}
          src={product.thumbnail}
          alt="Triple cheese burger"
          // fill
        />
        <ContainerData>
          <InformationProduct>
            <ValueProduct>{formatCurrency(product.price)}</ValueProduct>
            <RatingsProduct>
              <HiStar />
              4.5
            </RatingsProduct>
          </InformationProduct>
          <TitleProduct>{product.name}</TitleProduct>
        </ContainerData>
      </ContainerProduct>
    </>
  );
};

export default CardProduct;
