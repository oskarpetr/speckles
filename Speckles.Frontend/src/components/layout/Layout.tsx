import { Fragment, ReactNode } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import RoundedButton from "../common/RoundedButton";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Fragment>
      <Menu />

      <div className="px-32 py-20 mt-[92px] flex flex-col gap-20 min-h-[calc(100vh-92px)]">
        {children}
      </div>

      <div className="fixed bottom-8 right-8">
        <RoundedButton icon="Globe" />
      </div>

      <Footer />
    </Fragment>
  );
}
