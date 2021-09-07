import {ContractDataType} from "../../../../store/modules/contract/types";

export type ListItemProps = {
  item: ContractDataType;
};

export type ListItemConponent = (props: ListItemProps) => JSX.Element;
