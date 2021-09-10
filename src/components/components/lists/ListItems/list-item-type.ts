import { ContractDataListType } from "../../../../store/modules/contract/types";

export type ListItemProps = {
  item: ContractDataListType;
};

export type ListItemConponent = (props: ListItemProps) => JSX.Element;
