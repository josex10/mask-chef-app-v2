"use server";

import { IExpense } from "@/utils/interfaces/private/admin/expenses";
import { ExpenseSchema } from "@/utils/schemas/private/ExpenseSchema";
import { parseString } from "xml2js";

import { getXataClient } from "@/xata";
import IRestaurant from "@/utils/interfaces/private/admin/restaurant";
import { IUser } from "@/utils/interfaces/private/admin/user";
import { IProvider } from "@/utils/interfaces/private/admin/provider";
import { ProviderSchema } from "@/utils/schemas/private/ProviderSchema";
import { IExpensesSummary } from "@/utils/interfaces/private/admin/expensesSummary";
import { ExpenseSummarySchema } from "@/utils/schemas/private/ExpenseSummarySchema";
import { IExpensesLineDetail } from "@/utils/interfaces/private/admin/expensesLineDetail";
import { GroupExpenseLineDetailSchema } from "@/utils/schemas/private/ExpenseLineDetailSchema";
import ICountry from "@/utils/interfaces/private/admin/country";

type TCreateExpenseFromXml = {
  error: boolean;
  message: string | null;
  expenseId: string | null;
  expenseDate: Date | null;
};
export const createExpenseFromXml = async (
  xmlData: string,
  restaurant: IRestaurant,
  user: IUser,
  countrySettings: ICountry
): Promise<TCreateExpenseFromXml> => {
  try {
    console.log(restaurant);
    const xmlToJson = await readXmlData(xmlData);

    if (!xmlToJson) throw new Error("Error reading the XML");

    if (!xmlToJson?.FacturaElectronica) {
      throw new Error(
        "The XML does not have the 'Factura Electronica' information, Invalid XML format."
      );
    }
    const completeExpense = xmlToJson.FacturaElectronica;

    if (!completeExpense?.Receptor) {
      throw new Error(
        "The XML does not have the 'Receptor' information, Invalid XML format."
      );
    }
    const Receptor = completeExpense.Receptor;

    if (!completeExpense?.Emisor) {
      throw new Error(
        "The XML does not have the 'Emisor' information, Invalid XML format."
      );
    }
    const Emisor = completeExpense.Emisor;

    if (!completeExpense?.ResumenFactura) {
      throw new Error(
        "The XML does not have the 'Resumen de Factura' information, Invalid XML format."
      );
    }
    const ResumenFactura = completeExpense.ResumenFactura;

    if (!completeExpense?.DetalleServicio) {
      throw new Error(
        "The XML does not have the 'Detalle de Servicio' information, Invalid XML format."
      );
    }
    const DetalleServicio = completeExpense.DetalleServicio;

    //MATCH LEGAL NUMBER OF THE RESTAURANT SELECTED WITH THE LEGAL NUMBER OF THE EXPENSE DOCUMENT
    const legalNumberResponse = checkExpenseAndRestLegalNumber(
      Receptor,
      restaurant
    );
    if (legalNumberResponse.error) {
      throw new Error(legalNumberResponse.message);
    }

    //CHECK IF THE PROVIDER EXIST FOR THIS RESTAURANT IF NOT CREATED IT
    const providerResponse = await createProviderOnDb(Emisor, restaurant, user);
    if (providerResponse.error && !providerResponse.providerId) {
      throw new Error(providerResponse.message);
    }

    //CREATE THE EXPENSE SUMMARY
    const expenseSummaryResponse = await createExpenseSummaryOnDb(
      ResumenFactura,
      countrySettings
    );
    if (expenseSummaryResponse.error && !expenseSummaryResponse.summaryId) {
      throw new Error(expenseSummaryResponse.message);
    }

    //CREATE THE EXPENSE DOCUMENT AND RETURN THE ID
    const expenseResponse = await createExpenseOnDb(
      completeExpense,
      restaurant,
      user,
      providerResponse.providerId as string,
      expenseSummaryResponse.summaryId as string
    );
    if (expenseResponse.error && !expenseResponse.expenseId) {
      throw new Error(expenseResponse.message);
    }

    //CREATE THE EXPENSE LINE DETAIL
    const lineDetailResponse = await createExpenseLineDetailOnDb(
      DetalleServicio.LineaDetalle,
      expenseResponse.expenseId as string,
      expenseSummaryResponse.summaryId as string
    );
    if (lineDetailResponse.error) {
      throw new Error(lineDetailResponse.message);
    }
    return {
      error: false,
      message: "Create Successfully",
      expenseId: expenseResponse.expenseId,
      expenseDate: expenseResponse.expenseDate,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.message ? error.message : "Error creating the expense.",
      expenseId: null,
      expenseDate: null,
    };
  }
};

const readXmlData = async (xmlData: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    parseString(xmlData, { explicitArray: false }, function (error, result) {
      if (error) reject();

      null ? reject() : resolve(result);
    });
  });
};

const checkExpenseAndRestLegalNumber = (
  Receptor: any,
  restaurant: IRestaurant
) => {
  if (!Receptor)
    return {
      error: true,
      message: "The expense XML does not provide the 'Receptor' information.",
    };

  //CHECK THE LEGAL NUMBER OF THE EXPENSE DOCUMENT
  const expenseLegalNumber = Receptor.Identificacion.Numero;
  if (!expenseLegalNumber) {
    return {
      error: true,
      message:
        "The expense XML does not provide the 'Receptor Legal Number' information.",
    };
  }

  //CHECK IF THE LEGAL NUMBER IS EQUAL TO THE RESTAURANT LEGAL NUMBER
  if (Number(expenseLegalNumber) !== restaurant.legalNumber) {
    return {
      error: true,
      message:
        "Legal number of the receptor invoice not match with the restaurant",
    };
  }

  return {
    error: false,
    message: "Legal number is valid.",
  };
};

const createProviderOnDb = async (
  provider: any,
  restaurant: IRestaurant,
  user: IUser
) => {
  if (!provider)
    return {
      error: true,
      message: "The purchase XML does not provide the 'Provider' information.",
      providerId: null,
    };

  const newProvider: IProvider = {
    restaurant: restaurant.id ? restaurant.id : "",
    name: provider.Nombre,
    legalNumber: provider.Identificacion.Numero,
    comercialName: provider.NombreComercial || "",
    phone: provider.Telefono?.NumTelefono || "",
    email: provider.CorreoElectronico,
    createdBy: user.id ? user.id : "",
  };

  const validation = ProviderSchema.safeParse(newProvider);

  if (validation.error) {
    return {
      error: true,
      message: "Error validating the provider",
      providerId: null,
    };
  }

  try {
    const xata = getXataClient();

    const filterProvider = await xata.db.providers
      .filter({
        legalNumber: newProvider.legalNumber,
        restaurant: newProvider.restaurant,
      })
      .getFirst();
    if (filterProvider)
      return {
        error: false,
        message: "Success, the provider is already on DB.",
        providerId: filterProvider.id,
      };

    const providerCreated = await xata.db.providers.create(newProvider);
    return {
      error: false,
      message: "New Provider created.",
      providerId: providerCreated.id,
    };
  } catch (error) {
    return {
      error: true,
      message: "Error creating the provider.",
      providerId: null,
    };
  }
};

type TCreateExpenseOnDb = {
  error: boolean;
  message: string;
  expenseId: string | null;
  expenseDate: Date | null;
};

const createExpenseSummaryOnDb = async (
  summary: any,
  countrySettings: ICountry
) => {
  if (!summary)
    return {
      error: true,
      message:
        "The purchase XML does not provide the 'Expense Summary' information.",
      summaryId: null,
    };

  const newExpenseSummary: IExpensesSummary = {
    CodigoTipoMoneda:
      summary.CodigoTipoMoneda?.CodigoMoneda ||
      countrySettings.currency_short_name,
    TotalServGravados: summary.TotalServGravados
      ? Number(summary.TotalServGravados)
      : 0,
    TotalServExentos: summary.TotalServExentos
      ? Number(summary.TotalServExentos)
      : 0,
    TotalServExonerado: summary.TotalServExonerado
      ? Number(summary.TotalServExonerado)
      : 0,
    TotalMercanciasGravadas: summary.TotalMercanciasGravadas
      ? Number(summary.TotalMercanciasGravadas)
      : 0,
    TotalMercanciasExentas: summary.TotalMercanciasExentas
      ? Number(summary.TotalMercanciasExentas)
      : 0,
    TotalMercExonerada: summary.TotalMercExonerada
      ? Number(summary.TotalMercExonerada)
      : 0,
    TotalGravado: summary.TotalGravado ? Number(summary.TotalGravado) : 0,
    TotalExento: summary.TotalExento ? Number(summary.TotalExento) : 0,
    TotalExonerado: summary.TotalExonerado ? Number(summary.TotalExonerado) : 0,
    TotalVenta: summary.TotalVenta ? Number(summary.TotalVenta) : 0,
    TotalDescuentos: summary.TotalDescuentos
      ? Number(summary.TotalDescuentos)
      : 0,
    TotalVentaNeta: summary.TotalVentaNeta ? Number(summary.TotalVentaNeta) : 0,
    TotalImpuesto: summary.TotalImpuesto ? Number(summary.TotalImpuesto) : 0,
    TotalComprobante: summary.TotalComprobante
      ? Number(summary.TotalComprobante)
      : 0,
  };

  const validation = ExpenseSummarySchema.safeParse(newExpenseSummary);

  if (validation.error) {
    return {
      error: true,
      message: "Error validating the expense summary",
      summaryId: null,
    };
  }

  try {
    const xata = getXataClient();

    const expenseSummaryCreated = await xata.db.expenses_summary.create(
      newExpenseSummary
    );
    return {
      error: false,
      message: "New expense summary created.",
      summaryId: expenseSummaryCreated.id,
    };
  } catch (error) {
    return {
      error: true,
      message: "Error creating the expense summary.",
      summaryId: null,
    };
  }
};

const createExpenseOnDb = async (
  expense: any,
  restaurant: IRestaurant,
  user: IUser,
  providerId: string,
  summaryId: string
): Promise<TCreateExpenseOnDb> => {
  try {
    const newExpense: IExpense = {
      clave: expense.Clave,
      codigoActividad: expense.CodigoActividad,
      numeroConsecutivo: expense.NumeroConsecutivo,
      fechaEmision: new Date(expense.FechaEmision),
      restaurant: restaurant.id ? restaurant.id : "",
      createdBy: user.id ? user.id : "",
      provider: providerId,
      expenseSummary: summaryId,
    };
    const validation = ExpenseSchema.safeParse(newExpense);
    if (validation.error) {
      throw new Error("Error validating the expense");
    }

    const xata = getXataClient();

    const filterExpense = await xata.db.expenses
      .filter({ clave: newExpense.clave })
      .getFirst();
    if (filterExpense)
      throw new Error("The expense 'CLAVE' is already on the system.");
    const storedExpense = await xata.db.expenses.create(newExpense);
    return {
      error: false,
      message: "Success Process",
      expenseId: storedExpense.id,
      expenseDate: storedExpense.fechaEmision,
    };
  } catch (error: any) {
    await removeExpenseOnErrorCase(null, summaryId);
    return {
      error: true,
      message: error.message ? error.message : "Error creating the expense.",
      expenseId: null,
      expenseDate: null,
    };
  }
};

const createExpenseLineDetailOnDb = async (
  lineDetail: any,
  expenseId: string,
  summaryId: string
) => {
  try {
    if (!lineDetail)
      throw new Error(
        "The purchase XML does not provide the 'Line Detail' information."
      );

    let groupOfLineDetail: IExpensesLineDetail[] = [];
    if (Array.isArray(lineDetail)) {
      lineDetail.forEach((line) => {
        groupOfLineDetail.push({
          expense: expenseId,
          NumeroLinea: line.NumeroLinea ? Number(line.NumeroLinea) : 0,
          Codigo: line.Codigo ? line.Codigo : "",
          UnidadMedida: line.UnidadMedida ? line.UnidadMedida : "",
          Detalle: line.Detalle ? line.Detalle : "",
          PrecioUnitario: line.PrecioUnitario ? Number(line.PrecioUnitario) : 0,
          MontoTotal: line.MontoTotal ? Number(line.MontoTotal) : 0,
          SubTotal: line.SubTotal ? Number(line.SubTotal) : 0,
          ImpuestoTarifa: line.Impuesto?.Tarifa
            ? Number(line.Impuesto.Tarifa)
            : 0,
          ImpuestoMonto: line.Impuesto?.Monto ? Number(line.Impuesto.Monto) : 0,
          ImpuestoNeto: line.Impuesto?.Neto ? Number(line.Impuesto.Neto) : 0,
          MontoTotalLinea: line.MontoTotalLinea
            ? Number(line.MontoTotalLinea)
            : 0,
          Cantidad: Number(line.Cantidad) || 0,
        });
      });
    } else {
      groupOfLineDetail.push({
        expense: expenseId,
        NumeroLinea: lineDetail.NumeroLinea
          ? Number(lineDetail.NumeroLinea)
          : 0,
        Codigo: lineDetail.Codigo ? lineDetail.Codigo : "",
        UnidadMedida: lineDetail.UnidadMedida ? lineDetail.UnidadMedida : "",
        Detalle: lineDetail.Detalle ? lineDetail.Detalle : "",
        PrecioUnitario: lineDetail.PrecioUnitario
          ? Number(lineDetail.PrecioUnitario)
          : 0,
        MontoTotal: lineDetail.MontoTotal ? Number(lineDetail.MontoTotal) : 0,
        SubTotal: lineDetail.SubTotal ? Number(lineDetail.SubTotal) : 0,
        ImpuestoTarifa: lineDetail.Impuesto?.Tarifa
          ? Number(lineDetail.Impuesto.Tarifa)
          : 0,
        ImpuestoMonto: lineDetail.Impuesto?.Monto
          ? Number(lineDetail.Impuesto.Monto)
          : 0,
        ImpuestoNeto: lineDetail.Impuesto?.Neto
          ? Number(lineDetail.Impuesto.Neto)
          : 0,
        MontoTotalLinea: lineDetail.MontoTotalLinea
          ? Number(lineDetail.MontoTotalLinea)
          : 0,
        Cantidad: Number(lineDetail.Cantidad) || 0,
      });
    }

    if (groupOfLineDetail.length === 0) {
      throw new Error("Any line detail to create");
    }

    const validation =
      GroupExpenseLineDetailSchema.safeParse(groupOfLineDetail);
    if (validation.error) {
      throw new Error("Error validating the expense line detail");
    }

    const xata = getXataClient();

    await xata.db.expenses_line_detail.create(groupOfLineDetail);
    return {
      error: false,
      message: "New expense line detail created.",
    };
  } catch (error: any) {
    await removeExpenseOnErrorCase(expenseId, summaryId);
    return {
      error: true,
      message: error.message ? error.message : "Error creating the expense.",
    };
  }
};

const removeExpenseOnErrorCase = async (
  expenseId: string | null,
  summaryId: string
) => {
  const xata = getXataClient();

  if (expenseId) {
    try {
      await xata.sql`DELETE FROM "expenses_line_detail" WHERE expense=${expenseId}`;
    } catch (error) {
      console.log("Error removing line detail");
    }

    try {
      await xata.db.expenses.delete(expenseId);
    } catch (error) {
      console.log("Error removing expense");
    }
  }

  try {
    await xata.db.expenses_summary.delete(summaryId);
  } catch (error) {
    console.log("Error removing summary");
  }
};
