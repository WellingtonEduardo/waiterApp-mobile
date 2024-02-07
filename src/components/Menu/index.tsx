import { FlatList } from 'react-native';
import { Text } from '../Text';
import { ProductImage, ProductContainer, ProductDetails, Separator, AddToCartButton } from './styles';

import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Product } from '../../app/types/Product';
import { formatCurrency } from '../../app/utils/formatCurrency';
import { useMenuController } from './useMenuController';


interface MenuProps {
  onAddToCart(product: Product): void;
  products: Product[]
}

export function Menu({ onAddToCart, products }: MenuProps) {

  const {
    isModalVisible,
    selectedProduct,
    handleOpenModal,
    handleCloseModal
  } = useMenuController();

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onCloseModal={handleCloseModal}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.0.105:3001/uploads/${product.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight='Semibold'>{product.name}</Text>
              <Text size={14} color='#666' style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight='Semibold'>
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>

          </ProductContainer>
        )}
      />
    </>
  );
}
