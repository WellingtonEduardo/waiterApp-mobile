import { httpClient } from '../httpClient';


export async function getProductsByCategoryId(categoryId: string) {
  const {data} = await httpClient.get(`/categories/${categoryId}/products`);
  return data;
}
