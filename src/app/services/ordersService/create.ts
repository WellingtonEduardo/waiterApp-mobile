import { httpClient } from '../httpClient';

interface OrderProps {

  table: string,
  products: {
    product: string,
    quantity: number
  }[]

}

export async function create(order: OrderProps) {
  const { status } = await httpClient.post('/orders', order);
  return status;
}
