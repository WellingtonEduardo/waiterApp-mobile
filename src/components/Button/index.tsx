import { Text } from '../Text';
import { Container } from './styles';

interface ButtonProps {
  children: string;
  onPress(): void;
  disabled?: boolean;
}

export function Button({ onPress, disabled, children }: ButtonProps) {
  return (
    <Container onPress={onPress} disabled={disabled}>
      <Text weight='Semibold' color='#fff'>
        {children}
      </Text>
    </Container>
  );
}
