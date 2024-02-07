import { FlatList, Modal } from 'react-native';

import {
  CloseButton,
  Image,
  Header,
  ModalBody,
  IngredientsContainer,
  Ingredient,
  FooterContainer,
  Footer,
  Price
} from './styles';
import { Close } from '../Icons/Close';
import { Text } from '../Text';

import { Button } from '../Button';
import { formatCurrency } from '../../app/utils/formatCurrency';
import { Product } from '../../app/types/Product';
import { useProductModalController } from './useProductModalController';


interface ProductModalProps {
  visible: boolean;
  onCloseModal(): void;
  product: Product | null;
  onAddToCart(product: Product): void
}

export function ProductModal({ visible, product, onCloseModal, onAddToCart }: ProductModalProps) {

  if (!product) {
    return null;
  }

  const {
    handleAddToCart
  } = useProductModalController({ product, onCloseModal, onAddToCart });


  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onCloseModal}
    >
      <Image
        source={{
          uri: `http://192.168.0.105:3001/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onCloseModal}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text weight='Semibold' size={24}>{product.name}</Text>
          <Text color='#666' style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight='Semibold' color='#666'>Ingredientes</Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={ingredient => ingredient._id}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color='#666' style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <FooterContainer>
        <Footer>
          <Price>
            <Text color='#666'>Preço</Text>
            <Text size={20} weight='Semibold'>
              {formatCurrency(product.price)}
            </Text>
          </Price>

          <Button onPress={handleAddToCart}>
            Adicionar ao pedido
          </Button>
        </Footer>
      </FooterContainer>
    </Modal>
  );
}
