"use client";

import useStoreAuth from "@/store/private/admin/auth";
import { NumericFormat } from "react-number-format";

type TTextFieldForCurrency = {
  totalAmount: number;
};
const TextFieldForCurrency = ({ totalAmount }: TTextFieldForCurrency) => {
  const countrySettings = useStoreAuth((state) => state.countrySettings);
  const currencyName = countrySettings?.currency_short_name
    ? countrySettings.currency_symbol
    : "$";
  return (
    <NumericFormat
      className="text-nowrap"
      displayType="text"
      prefix={`${currencyName} `}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      value={totalAmount}
    />
  );
};

export default TextFieldForCurrency;
