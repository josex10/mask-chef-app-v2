export interface IMCTableWrapperProps {
  data: IMCTableData;
  header?: IMCTableWrapperDescriptionProps;
}

export interface IMCTableWrapperDescriptionProps {
  title?: string;
  description?: string;
  amountOfRows?: number;
}

export interface IMCTableData {
  headers: IMCTableHeader[];
  rows: IMCTableRow[];
}

export interface IMCTableHeader {
  showHeader: boolean;
  headerLabel: string;
  headerClassName: string;
}

export interface IMCTableRow {
  rowClickHandler: () => void;
  isSelected: boolean;
  rowClassName: string;
  columns: IMCTableRowColumns[];
}

export interface IMCTableRowColumns {
  key: string;
  columnClassName: string;
  value: React.ReactNode;
}
