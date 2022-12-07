import type { NextPage } from 'next';

import Menu from '@/components/Menu';

import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Title } from '@/styles/pages/home';
import { ContainerPage } from '@/styles/pages/geral';

import CardProduct from '@/components/CardProduct';
import { ListProducts } from '@/styles/pages/products';
import CardNewProduct from '@/components/CardNewProduct';
import useSWR from 'swr';

const Products: NextPage = () => {
  const { accessToken, isLoaded } = useAuth();
  const { data: products, mutate: refreshProducts } =
    useSWR<TProduct[]>(`/product`);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !accessToken) {
      router.push(`/login`);
    }
  }, [router, isLoaded, accessToken]);

  if (!isLoaded && !accessToken) {
    return <div />;
  }

  return (
    <>
      <Menu active="products" />

      <ContainerPage>
        <Title>Produtos</Title>

        <ListProducts>
          <CardNewProduct refreshProducts={refreshProducts} />
          {products &&
            products.map((product) => (
              <CardProduct
                refreshProducts={refreshProducts}
                product={product}
                key={product.id}
              />
            ))}
        </ListProducts>
      </ContainerPage>
    </>
  );
};

export default Products;
