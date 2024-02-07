import { Modal, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Form, ModalBody, Overlay, Header, Input } from './styles';
import { Close } from '../Icons/Close';
import { Button } from '../Button';
import { useTableModalController } from './useTableModalController';
import { IS_ANDROID } from '../../app/config/constants';


interface TableModalProps {
  visible: boolean;
  onClose(): void;
  onSave(table: string): void
}




export function TableModal({ visible, onClose, onSave }: TableModalProps) {

  const {
    table,
    setTable,
    handleSave
  } = useTableModalController({ onSave, onClose });

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={IS_ANDROID ? 'height' : 'padding'}>
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
              onPress={handleSave}
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
