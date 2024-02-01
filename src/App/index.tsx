import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  FooterContainer,
  Footer,
  CenteredContainer
} from './styles';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { products as mockProducts } from '../mocks/products';
import { categories as mockCategories } from '../mocks/categories';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';
import axios from 'axios';


export function App() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState<null | string>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {

    Promise.all([
      axios.get('http://192.168.0.105:3001/categories'),
      axios.get('http://192.168.0.105:3001/products')
    ]).then(([categoriesRes, productsRes]) => {
      setCategories(categoriesRes.data);
      setProducts(productsRes.data);
      setIsLoading(false);
    });
  }, []);


  async function handleSelectCategory(categoryId: string | null) {
    const route = (!categoryId ? '/products' : `/categories/${categoryId}/products`);
    setIsLoadingProducts(true);
    const { data } = await axios.get(`http://192.168.0.105:3001${route}`);
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






  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color='#d73035' size='large' />
          </CenteredContainer>

        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color='#d73035' size='large' />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu
                      onAddToCart={handleAddToCart}
                      products={products}
                    />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color='#666' style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <FooterContainer>
        <Footer>
          {!selectedTable && (
            <Button onPress={handleOpenModal} disabled={isLoading} >
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              selectedTable={selectedTable}
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </Footer>
      </FooterContainer>

      <TableModal
        visible={isTableModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveTable}
      />

    </>
  );

}
