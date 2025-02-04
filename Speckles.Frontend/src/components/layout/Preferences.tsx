import Input from "../forms/Input";
import PopupTooltip from "../shared/PopupTooltip";
import RoundedButton from "../shared/RoundedButton";

export default function Preferences() {
  return (
    <div className="fixed bottom-8 right-8">
      <PopupTooltip button={<RoundedButton icon="Globe" />} anchor="top end">
        <div className="flex flex-col gap-8 p-6 w-72">
          <Input
            title="Language"
            type="select"
            name="Language"
            placeholder="Select a language"
            onChange={() => {}}
            onBlur={() => {}}
            value=""
            error=""
            touched={false}
            options={[]}
          />

          <Input
            title="Currency"
            type="select"
            name="Currency"
            placeholder="Select a currency"
            onChange={() => {}}
            onBlur={() => {}}
            value=""
            error=""
            touched={false}
            options={[]}
          />
        </div>
      </PopupTooltip>
    </div>
  );
}
