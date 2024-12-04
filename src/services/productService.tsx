import { Product,ProductCreate} from "../models/productModel";


export const CreateNewProduct= async(data:ProductCreate)=>{
    const response = await fetch(`http://localhost:5001/api/product`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json', // Dodajte Content-Type header
        },
        body: JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const LoadProducts = async (): Promise<Product[]> => {
    const response = await fetch(`http://localhost:5001/api/product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Error with getting user posts');
    }
    return response.json(); // Očekujemo niz Product objekata
  };

export const LoadProductById = async (id: number): Promise<Product> => {
const response = await fetch(`http://localhost:5001/api/product/${id}`);
if (!response.ok) {
    throw new Error("Failed to load product");
}
return await response.json();
};