export interface Product {
    id: string;
    title_uz: string;
    title_eng: string;
    title_ru: string;
    price: number;
    description_uz: string;
    description_ru: string;
    description_eng: string;
    address_uz: string;
    address_ru: string;
    address_eng: string;
    lat: string;
    long: string;
    photos: string[];
    phone: string;
    typeOfProductId: string;
    slug: string;
    isTop: boolean;
}
