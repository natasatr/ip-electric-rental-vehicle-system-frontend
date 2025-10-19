import { VehicleDTO } from "./VehicleDTO";

export interface ElectricCarDTO extends VehicleDTO{
    dateOfPurchase: string;
    description: string;
}