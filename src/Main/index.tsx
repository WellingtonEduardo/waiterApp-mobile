import { ActivityIndicator } from 'react-native';
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


import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { useMainController } from './useMainController';




export function Main() {

  const {
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
  } = useMainController();

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
