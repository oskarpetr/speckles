import Icon from "../shared/Icon";

export default function AddMember() {
  return (
    <button className="flex items-center gap-6">
      <div className="flex justify-center items-center w-[120px] h-[120px] bg-neutral-100 border border-black border-opacity-10 rounded-full">
        <Icon name="Plus" size={36} className="opacity-50" />
      </div>

      <div className="flex flex-col items-start">
        <div className="text-lg font-bold">Add member</div>
        <div className="opacity-80">To your studio</div>
      </div>
    </button>
  );
}
