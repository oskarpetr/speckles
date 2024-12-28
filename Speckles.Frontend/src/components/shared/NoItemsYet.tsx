interface Props {
  items: string;
}

export default function NoItemsFound({ items }: Props) {
  return <div className="text-neutral-500">No {items} yet</div>;
}
