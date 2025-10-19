import { VehicleStatus } from "../enums/VehicleStatus";
import { MalfunctionDTO } from "./MalfunctionDTO";

export interface VehicleDTO {
    id?: number;
    uniqueId: string;
    manufacturerId: number;
    manufacturer: string;
    rented?: boolean;
    purchasePrice: number;
    model: string;
    hasMalfunction: boolean;
    picture: string;
    vehicleStatus: VehicleStatus,
    malfunctionDTO?: MalfunctionDTO | null;
}