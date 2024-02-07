import { Product } from '../../app/types/Product';


interface useProductModalControllerProps {
  product: Product | null;
  onCloseModal(): void;
  onAddToCart(product: Product): void
}

export function useProductModalController({ product, onAddToCart, onCloseModal }: useProductModalControllerProps) {

  function handleAddToCart() {
    onAddToCart(product!);
    onCloseModal();
  }

  return {
    handleAddToCart
  };

}
