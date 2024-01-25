import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
 margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
 flex: 1;
 background-color: #fafafa;
`;

export const CategoriesContainer = styled.View`
  height: 73px;
  margin-top: 34px;
`;

export const MenuContainer = styled.View`
  flex: 1;
`;

export const FooterContainer = styled.View`
  min-height: 110px;
  background-color: #fff;
  padding: 16px 24px;
`;



export const Footer = styled.SafeAreaView`


`;
