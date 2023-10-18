export interface Order {
    id: number;
    userId: string;
    shipping_address: string;
    shipping_price: number;
    total_price: number;
    payment_type: string;
    is_paid: boolean;
}