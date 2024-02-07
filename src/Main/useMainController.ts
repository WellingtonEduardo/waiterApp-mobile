import { useEffect, useState } from 'react';
import { CartItem } from '../app/types/CartItem';
import { Product } from '../app/types/Product';
import { Category } from '../app/types/Category';
import { categoriesService } from '../app/services/categoriesService';
import { productsService } from '../app/services/productsService';


export function useMainController() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState<null | string>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {

    Promise.all([
      categoriesService.getAll(),
      productsService.getAll()
    ]).then(([categoriesRes, productsRes]) => {
      setCategories(categoriesRes);
      setProducts(productsRes);
      setIsLoading(false);
    });
  }, []);


  async function handleSelectCategory(categoryId: string | null) {
    setIsLoadingProducts(true);

    let data: Product[] = [];
    if (!categoryId ) {
      data =  await productsService.getAll();

    }else {
      data =  await categoriesService.getProductsByCategoryId(categoryId);
    }
    setProducts(data);
    setIsLoadingProducts(false);
  }




  function handleOpenModal() {
    setIsTableModalVisible(true);
  }
  function handleCloseModal() {
    setIsTableModalVisible(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }


  function handleResetOrder() {
    setSelectedTable(null);
    setCartItems([]);
  }


  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      handleOpenModal();
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product
        });
      }

      const newCartItems = [...prevState];

      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity + 1
      };

      return newCartItems;
    });

  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id
      );
      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity - 1
      };

      return newCartItems;

    });
  }


  return {
    isTableModalVisible,
    selectedTable,
    cartItems,
    isLoading,
    products,
    categories,
    isLoadingProducts,
    handleSelectCategory,
    handleOpenModal,
    handleCloseModal,
    handleSaveTable,
    handleResetOrder,
    handleAddToCart,
    handleDecrementCartItem

  };


}
