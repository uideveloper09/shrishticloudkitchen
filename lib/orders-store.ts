import { Order } from "@/types";

declare global {
  var __orders: Order[] | undefined;
}

const orders = (globalThis.__orders ??= []);

export function addOrder(order: Order) {
  orders.push(order);
  return order.id;
}

export function getOrders() {
  return [...orders];
}

export function getOrderById(id: string) {
  return orders.find((o) => o.id === id);
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const order = orders.find((o) => o.id === id);
  if (order) order.status = status;
  return order;
}
