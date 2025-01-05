import {
  Dialog as DialongHeadless,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Heading from "./Heading";
import Icon from "./Icon";

interface Props {
  title?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function Dialog({ title, open, setOpen, children }: Props) {
  return (
    <DialongHeadless
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setOpen(false)}
      transition
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-50"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full max-w-xl rounded-xl bg-neutral-100 p-8 duration-500 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex items-center justify-between mb-6">
              {title && <Heading title={title} heading="h4" />}
              <button onClick={() => setOpen(false)}>
                <Icon name="X" />
              </button>
            </div>

            {children}
          </DialogPanel>
        </div>
      </div>
    </DialongHeadless>
  );
}
