export interface Transfer {
    transferId: number,
    fromWarehouseId: number,
    toWarehouseId: number,
    quantity: number,
    userId: number,
    productId: number,
    transferDate: Date,
    createdDate: Date,
    productName: string,
    fromWarehouseLocation: string,
    toWarehouseLocation: string,
    userMailId: string
}
