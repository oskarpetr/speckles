import { IMenuItem } from "@/types/MenuItem.types";
import Input from "../forms/Input";
import DropdownMenu from "../shared/DropdownMenu";
import PopupTooltip from "../shared/PopupTooltip";
import { Dispatch, SetStateAction } from "react";
import { useSearchPromptsQuery } from "@/hooks/useApi";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchPrompts({ search, setSearch }: Props) {
  // fetch search prompts
  const searchPromptsQuery = useSearchPromptsQuery(search);
  const searchPrompts = searchPromptsQuery.data?.data ?? [];

  // search items
  const searchItems: IMenuItem[] = searchPrompts.map((asset) => ({
    text: asset.name,
    onClick: () => setSearch(asset.name),
  }));

  return (
    <PopupTooltip
      button={
        <Input
          name="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onBlur={() => {}}
          error={undefined}
          touched={undefined}
          icon="MagnifyingGlass"
          autocomplete={false}
        />
      }
      anchor="bottom start"
      className="mt-4 ml-12"
    >
      {searchItems.length > 0 && <DropdownMenu items={searchItems} />}
    </PopupTooltip>
  );
}
