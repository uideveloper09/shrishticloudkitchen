import { Order } from "@/types";

// In-memory store for demo. Replace with database (e.g. Prisma + PostgreSQL) using DATABASE_URL.
export const ordersDb: Order[] = [];

export function addOrder(order: Order) {
  ordersDb.push(order);
  return order.id;
}

export function getOrderById(id: string): Order | undefined {
  return ordersDb.find((o) => o.id === id);
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const o = ordersDb.find((o) => o.id === id);
  if (o) o.status = status;
  return o;
}

export function getOrdersByUser(userId: string) {
  return ordersDb.filter((o) => o.userId === userId);
}

export function getAllOrders() {
  return [...ordersDb];
}
