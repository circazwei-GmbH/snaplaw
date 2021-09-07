export type ListItemProps = {
  item: Record<string, any>
}

export type ListItemConponent  = (props: ListItemProps) => JSX.Element
