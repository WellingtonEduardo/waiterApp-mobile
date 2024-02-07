import { FlatList, TouchableOpacity } from 'react-native';

import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer
} from './styles';
import { Text } from '../Text';

import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';

import { OrderConfirmedModal } from '../OrderConfirmedModal';

import { CartItem } from '../../app/types/CartItem';
import { Product } from '../../app/types/Product';
import { formatCurrency } from '../../app/utils/formatCurrency';
import { calculatePriceTotalItems } from '../../app/utils/calculatePriceTotalItems';
import { useCartController } from './useCartController';

interface CartProps {
  cartItems: CartItem[];
  selectedTable: string
  onAdd(product: Product): void;
  onDecrement(product: Product): void;
  onConfirmOrder(): void;
}
export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) {

  const {
    isLoading,
    isModalVisible,
    handleConfirmOrder,
    handleOk
  } = useCartController({ cartItems, selectedTable, onConfirmOrder });


  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 120 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.105:3001/uploads/${cartItem.product.imagePath}`
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color='#666'>
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight='Semibold'>{cartItem.product.name}</Text>
                  <Text size={14} color='#666' style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )

      }

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#666'>Total</Text>
              <Text size={20} weight='Semibold'>
                {formatCurrency(calculatePriceTotalItems(cartItems))}
              </Text>
            </>
          ) : (
            <Text color='#999'>
              Seu carrinho está vazio
            </Text>
          )
          }
        </TotalContainer>

        <Button
          disabled={cartItems.length === 0}
          onPress={handleConfirmOrder}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
