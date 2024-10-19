import { Fragment, ReactNode } from "react";
import Menu from "./Menu";
import { CurrencyDollar } from "@phosphor-icons/react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Fragment>
      <Menu />

      <div className="px-32 py-20 mt-[92px] flex flex-col gap-20">
        {children}
      </div>

      <button className="bg-green-primary p-4 rounded-full fixed right-8 bottom-8">
        <CurrencyDollar size={24} color="white" />
      </button>
    </Fragment>
  );
}
