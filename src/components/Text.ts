import styled from 'styled-components/native';

interface TextProps {
  weight?: 'Regular' | 'Semibold' | 'Bold';
  color?: string;
  size?: number;
  opacity?: number;
}

export const Text = styled.Text<TextProps>`
  font-family: ${({ weight }) =>
    weight ? `GeneralSans-${weight}` : 'GeneralSans-Regular'};
  color: ${({ color }) => color || '#333'};
  font-size: ${({ size }) => (size ? `${size}px` : '16px')};
  opacity: ${({ opacity }) => opacity || 1};
`;
