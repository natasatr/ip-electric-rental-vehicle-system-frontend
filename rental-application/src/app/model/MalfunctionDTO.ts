export interface MalfunctionDTO {
    id?: number;
    description: string; 
    dateTimeMalfunction: string;
    vehicleId: number;
    vehicleModel?: string;
}