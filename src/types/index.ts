export interface User {
    id: number;
    name: string;
    email: string;
    role: "user" | "admin" | "seller";
    avatar?: string;
    phone?: string;
    createdAt?: Date;
}

export interface Category {
    id: number;
    name: string;
    icon?: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    categoryId: number;
    images: string[];
    sellerId: number;
    seller: User;
    status: "pending" | "approved" | "rejected" | "hide" | "ready" | "sold";
    createdAt?: Date;

}

export interface Review {
    id: number;
    rating: number;
    comment: string;
    user: User;
    productId: number;
    createdAt?: Date;
}

export interface CartItem {
    id: number;
    quantity: number;
    productId: number;
    product: Product;    
}



export interface Order {
    id: number;
    userId: number;
    user: User;
    totalPrice: number;
    status: "pending" | "paid" | "shipped" | "cancelled";
    items: CartItem[];
    shippingAddress: string;
    city: string;
    province: string;
    postalCode: string;
    createdAt?: Date;
}

export interface Message {
    id: number;
    message: string;
    senderId: number;
    sender: User;
    receiverId: number;
    receiver: User;
    productId?: number;
    product?: Product;
    isRead: boolean;
    createdAt?: Date
}

export interface Notification {
    id: number;
    userId: number;
    title: string;
    message: string;
    isRead: boolean;
    type: "order" | "chat" | "product" | "system" ;
    createdAt?: Date;

}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: "user" | "seller";
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ProductParams {
    search?: string;
    categoryId?: number;
    page?: number;
    limit?: number;

}

export interface ProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    images: string[];
}

export interface CartRequest {
    productId: number;
    quantity: number;
}

export interface OrderRequest {
    items: CartItem[];
    shippingAddress: string;
    city: string;
    province: string;
    postalCode: string;
}

export interface PaymentResponse {
    orderId: number;
    token: string;
    redirectUrl: string;

}

export interface ReviewRequest {
    rating: number;
    comment: string;
}

export interface MessageRequest {
    message: string;
    receiverId: number;
    productId?: number;
}

export interface DashboardStats {
    totalTransactions: number;
    totalUsers: number;
    totalProducts: number;
    dailyTransactions: {
        date: string;
        total: number;
    };
    topProduct: {
        product: Product;
        total: number;
    };
}