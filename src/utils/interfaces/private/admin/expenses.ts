import IRestaurant from "./restaurant";
import { IUser } from "./user";

export interface IExpense {
  id?: string;
  clave: string;
  codigoActividad: string;
  numeroConsecutivo: string;
  fechaEmision: Date;
  restaurant: string;
  createdBy: string;
  provider: string;
  expenseSummary: string;
}
