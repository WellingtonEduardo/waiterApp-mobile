import { useState } from 'react';
import { Product } from '../../app/types/Product';




export function useMenuController() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setSelectedProduct(product);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedProduct(null);
  }

  return {
    isModalVisible,
    selectedProduct,
    handleOpenModal,
    handleCloseModal
  };
}
