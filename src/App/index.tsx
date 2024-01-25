
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  FooterContainer,
  Footer } from './styles';


export function App() {

  return (
    <>
      <Container>

        <Header/>

        <CategoriesContainer>
          <Categories/>
        </CategoriesContainer>

        <MenuContainer>
          <Menu/>
        </MenuContainer>

      </Container>

      <FooterContainer>
        <Footer>
          <Button onPress={()=> console.log('Button press')} >
            Novo Pedido
          </Button>
        </Footer>
      </FooterContainer>
    </>
  );

}
