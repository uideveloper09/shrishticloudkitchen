export interface MenuItem {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderItem {
  itemId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: "razorpay" | "cod";
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
  createdAt: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
}
