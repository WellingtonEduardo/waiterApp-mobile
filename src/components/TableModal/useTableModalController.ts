import { useState } from 'react';
import { Platform } from 'react-native';


interface useTableModalControllerProps {
  onClose(): void;
  onSave(table: string): void
}



export function useTableModalController({ onSave, onClose }: useTableModalControllerProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    setTable('');
    onClose();
  }

  return {
    table,
    setTable,
    handleSave
  };

}
