import styled from 'styled-components/native';
import { IS_ANDROID } from '../../app/config/constants';



export const CategoryContainer = styled.TouchableOpacity`
  align-items: center;
  margin-left: 30px;
`;



export const Icon = styled.View`
  background-color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  box-shadow: 0px 2px 1px rgba(0,0,0, ${IS_ANDROID ? 1 : 0.1});
  elevation: 2;
 `;
