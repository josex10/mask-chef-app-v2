import { Separator } from "@/components/ui/separator";
import { convertDateToStandard } from "@/utils/helpers/dates";
import { ICustomSingleExpensePaymentDetail } from "@/utils/interfaces/private/admin/customSingleExpensePaymentDetail";
import { Calendar, HandCoins, NotebookPen } from "lucide-react";

type TExpenseDetailPaymentSectionProps = {
  expenseData: ICustomSingleExpensePaymentDetail;
};

const ExpenseDetailPaymentSection = ({
  paymentTypeType,
  referenceNumber,
  notes,
  createdAt,
}: ICustomSingleExpensePaymentDetail) => {
  return (
    <>
      <Separator className="my-4" />
      <div className="grid gap-3">
        <div className="font-semibold">Información de Pago</div>
        <dl className="grid gap-3">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <HandCoins className="h-4 w-4" />
              {paymentTypeType}
            </dt>
            {referenceNumber && <dd>{`Num.Ref: ${referenceNumber}`}</dd>}
          </div>
          {notes && (
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <NotebookPen className="h-4 w-4" />
                Notas
              </dt>
              <dd>{notes}</dd>
            </div>
          )}

          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Fecha de Pago
            </dt>
            <dd>
              {convertDateToStandard(
                String(createdAt)
              )}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default ExpenseDetailPaymentSection;
