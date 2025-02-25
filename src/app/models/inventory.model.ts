import { Product } from "./product.model";
import { Warehouse } from "./warehouse.model";

export interface Inventory {
    inventoryId: number;
    productId: number;
    warehouseId: number;
    quantity: number;
    createdDate: Date;
    updatedDate: Date;
    productName: string;
    warehouseLocation: string;
    updatedBy: string ;

    product: Product | undefined;
    warehouse: Warehouse | undefined;
}
