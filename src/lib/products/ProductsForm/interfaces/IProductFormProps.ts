import { IComboboxOption } from "@/utils/interfaces/shared/IComboboxOption";
import { EProductFormType } from "../enums";
import { IProduct } from "../../interfaces";

export interface IProductFormProps {
  categories: IComboboxOption[];
  providers: IComboboxOption[];
  unitOfMeasures: IComboboxOption[];
  formType: EProductFormType;
  product: IProduct | null;
}
