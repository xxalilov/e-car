export declare class CreateProductDto {
    title_uz: string;
    title_ru: string;
    title_eng: string;
    price: number;
    description_uz: string;
    description_eng: string;
    description_ru: string;
    address_uz: string;
    address_ru: string;
    address_eng: string;
    lat: string;
    long: string;
    photos: string[];
    phones: string;
    typeOfProductId: string;
    slug: string;
}
export declare class UpdateProductDto {
    title: string;
    price: number;
    description: string;
    address: string;
    lat: string;
    long: string;
    photos: string[];
    phones: string;
    typeOfProductId: string;
    slug: string;
}
