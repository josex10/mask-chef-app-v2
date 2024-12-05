export interface IProductsTable {
  id: string;
  name: string;
  price: number;
  createdBy: string;
  providerBy: string;
  category: string;
  unitOfMeasure: string;
  handleInventory: boolean;
  isAvailable: boolean;
}
