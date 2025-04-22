
// KiCardapio data models

// Multi-tenant model
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  description?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  planType: 'free' | 'pro' | 'premium';
}

// Category model
export interface Category {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product model
export interface Product {
  id: string;
  tenantId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isActive: boolean;
  hasOptions: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Option group model
export interface OptionGroup {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  minSelection: number;
  maxSelection: number;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product-OptionGroup relationship
export interface ProductOptionGroup {
  productId: string;
  optionGroupId: string;
}

// Option model
export interface Option {
  id: string;
  optionGroupId: string;
  name: string;
  description?: string;
  additionalPrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Table QR code model
export interface TableQR {
  id: string;
  tenantId: string;
  tableNumber: string;
  qrCodeUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order model (if implementing ordering functionality)
export interface Order {
  id: string;
  tenantId: string;
  tableNumber?: string;
  customerName?: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order Item model
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order Item Option
export interface OrderItemOption {
  id: string;
  orderItemId: string;
  optionId: string;
  name: string;
  additionalPrice: number;
}
