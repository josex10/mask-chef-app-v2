// Generated by Xata Codegen 0.30.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "restaurants",
    columns: [
      {
        name: "email",
        type: "string",
        notNull: true,
        defaultValue: "SYSTEM_EMAIL",
      },
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "RESTAURANT_NAME",
      },
      { name: "country", type: "link", link: { table: "countries" } },
      { name: "address", type: "string" },
      { name: "phone", type: "string" },
      { name: "legalNumber", type: "int", unique: true },
    ],
    revLinks: [
      { column: "id_restaurant", table: "users_x_restaurants" },
      { column: "restaurant", table: "expenses" },
      { column: "restaurant", table: "providers" },
    ],
  },
  {
    name: "countries",
    columns: [
      { name: "name", type: "string", unique: true },
      { name: "short_name", type: "string", unique: true },
      {
        name: "language",
        type: "string",
        notNull: true,
        defaultValue: "SPANISH",
      },
      {
        name: "currency_name",
        type: "string",
        notNull: true,
        defaultValue: "US Dollar",
      },
      {
        name: "currency_short_name",
        type: "string",
        notNull: true,
        defaultValue: "USD",
      },
      {
        name: "currency_symbol",
        type: "string",
        notNull: true,
        defaultValue: "$",
      },
    ],
    revLinks: [{ column: "country", table: "restaurants" }],
  },
  {
    name: "users_x_restaurants",
    columns: [
      { name: "id_restaurant", type: "link", link: { table: "restaurants" } },
      { name: "id_user", type: "link", link: { table: "users" } },
      { name: "favorite", type: "bool", notNull: true, defaultValue: "false" },
    ],
  },
  {
    name: "users",
    columns: [
      { name: "email", type: "string", unique: true },
      {
        name: "id_clerk",
        type: "string",
        notNull: true,
        defaultValue: "ID_CLERK_NULL",
      },
      { name: "name", type: "string" },
    ],
    revLinks: [
      { column: "id_user", table: "users_x_restaurants" },
      { column: "createdBy", table: "expenses" },
      { column: "createdBy", table: "providers" },
    ],
  },
  {
    name: "expenses",
    columns: [
      {
        name: "clave",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM_CLAVE",
      },
      {
        name: "codigoActividad",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM_CODE",
      },
      {
        name: "numeroConsecutivo",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM_NUMBER",
      },
      {
        name: "fechaEmision",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "restaurant", type: "link", link: { table: "restaurants" } },
      { name: "createdBy", type: "link", link: { table: "users" } },
      { name: "provider", type: "link", link: { table: "providers" } },
      {
        name: "expenseSummary",
        type: "link",
        link: { table: "expenses_summary" },
        unique: true,
      },
    ],
    revLinks: [
      { column: "expense", table: "expenses_line_detail" },
      { column: "expense", table: "expenses_summary" },
    ],
  },
  {
    name: "expense_status",
    columns: [
      {
        name: "name",
        type: "text",
        notNull: true,
        defaultValue: "STATUS_NAME",
      },
      { name: "description", type: "text" },
    ],
  },
  {
    name: "providers",
    columns: [
      { name: "restaurant", type: "link", link: { table: "restaurants" } },
      {
        name: "name",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM_NAME",
      },
      {
        name: "legalNumber",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM_LEGAL_NUMBER",
      },
      {
        name: "comercialName",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM_COMERCIAL_NAME",
      },
      { name: "phone", type: "text" },
      {
        name: "email",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM_EMAIL",
      },
      { name: "createdBy", type: "link", link: { table: "users" } },
    ],
    revLinks: [{ column: "provider", table: "expenses" }],
  },
  {
    name: "expenses_summary",
    columns: [
      {
        name: "CodigoTipoMoneda",
        type: "text",
        notNull: true,
        defaultValue: "USD",
      },
      {
        name: "TotalServGravados",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "TotalServExentos",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "TotalServExonerado",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "TotalMercanciasGravadas",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "TotalMercanciasExentas",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "TotalMercExonerada",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      { name: "TotalGravado", type: "float", notNull: true, defaultValue: "0" },
      { name: "TotalExento", type: "float", notNull: true, defaultValue: "0" },
      {
        name: "TotalExonerado",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      { name: "TotalVenta", type: "float", notNull: true, defaultValue: "0" },
      {
        name: "TotalDescuentos",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "TotalVentaNeta",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "TotalImpuesto",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "TotalComprobante",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      { name: "expense", type: "link", link: { table: "expenses" } },
    ],
    revLinks: [{ column: "expenseSummary", table: "expenses" }],
  },
  {
    name: "expenses_line_detail",
    columns: [
      { name: "expense", type: "link", link: { table: "expenses" } },
      { name: "NumeroLinea", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "Codigo",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM_CODE",
      },
      {
        name: "UnidadMedida",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM_UNIT_OF_MEASURE",
      },
      {
        name: "Detalle",
        type: "text",
        notNull: true,
        defaultValue: "SYSTEM _DETAIL",
      },
      {
        name: "PrecioUnitario",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      { name: "MontoTotal", type: "float", notNull: true, defaultValue: "0" },
      { name: "SubTotal", type: "float", notNull: true, defaultValue: "0" },
      {
        name: "ImpuestoTarifa",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      {
        name: "ImpuestoMonto",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      { name: "ImpuestoNeto", type: "float", notNull: true, defaultValue: "0" },
      {
        name: "MontoTotalLinea",
        type: "float",
        notNull: true,
        defaultValue: "0",
      },
      { name: "Cantidad", type: "float", notNull: true, defaultValue: "1" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Restaurants = InferredTypes["restaurants"];
export type RestaurantsRecord = Restaurants & XataRecord;

export type Countries = InferredTypes["countries"];
export type CountriesRecord = Countries & XataRecord;

export type UsersXRestaurants = InferredTypes["users_x_restaurants"];
export type UsersXRestaurantsRecord = UsersXRestaurants & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type Expenses = InferredTypes["expenses"];
export type ExpensesRecord = Expenses & XataRecord;

export type ExpenseStatus = InferredTypes["expense_status"];
export type ExpenseStatusRecord = ExpenseStatus & XataRecord;

export type Providers = InferredTypes["providers"];
export type ProvidersRecord = Providers & XataRecord;

export type ExpensesSummary = InferredTypes["expenses_summary"];
export type ExpensesSummaryRecord = ExpensesSummary & XataRecord;

export type ExpensesLineDetail = InferredTypes["expenses_line_detail"];
export type ExpensesLineDetailRecord = ExpensesLineDetail & XataRecord;

export type DatabaseSchema = {
  restaurants: RestaurantsRecord;
  countries: CountriesRecord;
  users_x_restaurants: UsersXRestaurantsRecord;
  users: UsersRecord;
  expenses: ExpensesRecord;
  expense_status: ExpenseStatusRecord;
  providers: ProvidersRecord;
  expenses_summary: ExpensesSummaryRecord;
  expenses_line_detail: ExpensesLineDetailRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Jose-Manuel-Badilla-Porras-s-workspace-nc0781.us-east-1.xata.sh/db/mask-chef-app-v2",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
