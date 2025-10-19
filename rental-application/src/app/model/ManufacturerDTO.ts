export interface ManufacturerDTO {
    id?: number;
    name: string;
    country: string;
    address: string;
    phone: string;
    fax: string;
    email: string;
    [key: string]: any;
}