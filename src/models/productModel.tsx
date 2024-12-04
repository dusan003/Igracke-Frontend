export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrls: string[];
  }

export interface ProductCreate{
  id: number,
  name: string | '',
  description: string | '',
  price: number | 0,
  imageUrls: string[]
}