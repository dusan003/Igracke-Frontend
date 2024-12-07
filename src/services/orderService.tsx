import { Order, OrderCreate } from "../models/orderModel";

export const CreateNewOrder = async (data: OrderCreate): Promise<Order> => {
  console.log("Order payload being sent to backend:", data); // Debug ispis
  const response = await fetch(`http://localhost:5001/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const LoadOrders = async (): Promise<Order[]> => {
  const response = await fetch(`http://localhost:5001/api/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching orders");
  }

  return response.json();
};

export const LoadOrderById = async (id: number): Promise<Order> => {
  const response = await fetch(`http://localhost:5001/api/order/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load order");
  }

  return response.json();
};
