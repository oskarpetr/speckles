import Button from "../shared/Button";
import Input from "./Input";
import { Dispatch, SetStateAction, useState } from "react";
import { ITagShort } from "@/types/dtos/Tag.types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  tags: ITagShort[];
  setTags: Dispatch<SetStateAction<ITagShort[]>>;
}

export default function AddTagForm({ tags, setTags }: Props) {
  // tag state
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState<string | null>(null);

  // on submit handler
  const onSubmit = () => {
    // validation
    if (tagName === "") {
      setError("Tag name is required");
      return;
    }

    // check if tag already exists
    const tagExists = tags.find((tag) => tag.name === tagName) !== undefined;
    if (tagExists) {
      setError("Tag already added");
      return;
    }

    setError(null);

    const tag: ITagShort = {
      tagId: uuidv4(),
      name: tagName,
    };

    setTags((prev) => [...prev, tag]);
    setTagName("");
  };

  return (
    <div className="flex gap-6 w-full">
      <div className="w-full">
        <Input
          name="name"
          onChange={(e) => setTagName(e.target.value)}
          value={tagName}
          placeholder="Enter name"
          touched
          error={error ? error : undefined}
        />
      </div>

      <Button text="Add" size="small" onClick={onSubmit} submitType="button" />
    </div>
  );
}
