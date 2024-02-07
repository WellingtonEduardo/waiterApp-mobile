import { useState } from 'react';
import { CartItem } from '../../app/types/CartItem';
import { ordersService } from '../../app/services/ordersService';

interface useCartControllerProps {
  cartItems: CartItem[];
  selectedTable: string
  onConfirmOrder(): void;
}



export function useCartController({ cartItems, selectedTable, onConfirmOrder }: useCartControllerProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function handleConfirmOrder() {
    const payload = {
      table: selectedTable,
      products: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }))
    };
    setIsLoading(true);

    await ordersService.create(payload);

    setIsModalVisible(true);
    setIsLoading(false);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return {
    isLoading,
    isModalVisible,
    handleConfirmOrder,
    handleOk
  };

}
