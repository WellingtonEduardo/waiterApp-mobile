import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Form, ModalBody, Overlay, Header, Input } from './styles';
import { Close } from '../Icons/Close';
import { Button } from '../Button';
import { useState } from 'react';

interface TableModalProps {
  visible: boolean;
  onClose(): void;
  onSave(table: string): void
}


const isAndroid = Platform.OS === 'android';

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');


  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='Semibold'>Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color='#666' />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor='#666'
              keyboardType='number-pad'
              onChangeText={setTable}
            />

            <Button
              onPress={() => onSave(table)}
              disabled={table.length === 0}
            >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
