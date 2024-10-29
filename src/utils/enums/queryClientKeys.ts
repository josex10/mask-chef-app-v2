import { getIncomesType } from '../../lib/actions/private/admin/incomes/GetIncomesType';
import { getIncomesLastCreated } from '../../lib/actions/private/admin/incomes/GetIncomesLastCreated';
export enum EQueryClientsKeys {
    expensesTable = "expensesTable",
    singleExpense = "singleExpense",
    expensesFinantialInfo = "expensesFinantialInfo",
    expensePaymentType = "expensePaymentType",
    expensesTableLastCreated = "expensesTableLastCreated",
    expensesHaciendaData = "expensesHaciendaData",

    // Providers
    getAllProvidersForSelect = "getAllProvidersForSelect",

    //Incomes
    getIncomesTypes = "getIncomesTypes",
    getIncomesLastCreated = "getIncomesLastCreated",
}