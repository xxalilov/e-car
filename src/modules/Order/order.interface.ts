export interface Order {
    id: number;
    userId: string;
    shipping_type: string;
    shipping_address: string;
    shipping_price: number;
    shipping_status: boolean;
    total_price: number;
    payment_type: string;
    is_paid: boolean;
}