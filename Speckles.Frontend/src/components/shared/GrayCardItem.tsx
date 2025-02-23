interface Props {
  property: string;
  value: string;
}

export function GrayCardItem({ property, value }: Props) {
  return (
    <div className="flex justify-between">
      <div>{property}</div>
      <div>{value}</div>
    </div>
  );
}
