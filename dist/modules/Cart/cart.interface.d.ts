export interface Cart {
    id: number;
    products: {
        productId: string;
        quantity: number;
    }[];
    userId: string;
}
