interface Props {
  text: string;
}

export default function Description({ text }: Props) {
  return <div className="max-w-[35rem]">{text}</div>;
}
