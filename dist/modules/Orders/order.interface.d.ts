export interface Order {
    id: number;
    products: [];
    userId: string;
    shippingAddress: {
        address: string;
        city: string;
        lat: string;
        long: string;
    };
    isPaid: boolean;
    paidAt: Date;
    totalPrice: number;
    isDelivered: boolean;
    deliveredAt: Date;
}
