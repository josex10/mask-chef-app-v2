export interface IProduct {
  category: string;
  createdBy: string;
  handleInventory: boolean;
  id: string;
  isAvailable: boolean;
  labels: string[];
  name: string;
  price: number;
  providerBy: string;
  restaurant: string;
  unitOfMeasure: string;
  minStockLevel: number;
  maxStockLevel: number;
  reOrderStockLevel: number;
}
