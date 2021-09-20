export type ListItemProps<T> = {
  item: T;
};

export type ListItemConponent<T> = (props: ListItemProps<T>) => JSX.Element;
