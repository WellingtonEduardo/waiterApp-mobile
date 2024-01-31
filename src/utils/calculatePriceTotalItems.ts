import { CartItem } from '../types/CartItem';

export function calculatePriceTotalItems (cartItems: CartItem[]){
  return cartItems.reduce((total, {product, quantity})=>{
    return total + (product.price * quantity);
  }, 0);
}
