import { useState } from "react";
import AddFileModal from "../modals/AddFileModal";
import Section from "../shared/Section";
import Button from "../shared/Button";

interface Props {
  title: string;
}

export default function FileSelector({ title }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Section title={title} chevron={false} className="min-h-48">
      <div className="absolute top-0 right-0">
        <Button
          text="Add file"
          onClick={() => setOpen(true)}
          type="cancel"
          size="small"
        />
      </div>
      <AddFileModal open={open} setOpen={setOpen} />
    </Section>
  );
}
