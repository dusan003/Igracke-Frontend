export interface OrderItem {
  id: number; // ID proizvoda
  name: string;      // Ime proizvoda
  quantity: number;  // Količina proizvoda
  price: number;     // Cena proizvoda
}

export interface Order {
  id: number;               // ID porudžbine
  firstName: string;        // Ime korisnika
  lastName: string;         // Prezime korisnika
  email: string;            // Email korisnika
  city: string;             // Grad korisnika
  address: string;          // Adresa korisnika
  postalCode: string;       // Poštanski broj
  phone: string;            // Telefon korisnika
  totalPrice: number;       // Ukupna cena porudžbine
  items: OrderItem[];       // Stavke porudžbine
  createdAt: string;        // Datum kreiranja porudžbine
}

export interface OrderCreate {
  id: number;
  firstName: string;        // Ime korisnika
  lastName: string;         // Prezime korisnika
  email: string;            // Email korisnika
  city: string;             // Grad korisnika
  address: string;          // Adresa korisnika
  postalCode: string;       // Poštanski broj
  phone: string;            // Telefon korisnika
  totalPrice: number;       // Ukupna cena porudžbine
  items: {                  // Stavke porudžbine za kreiranje
    id: number;      // ID proizvoda
    quantity: number;       // Količina proizvoda
  }[];
  createdAt: string;
}
