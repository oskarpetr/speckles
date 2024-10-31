import { Fragment, ReactNode, useEffect } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import RoundedButton from "../common/RoundedButton";
import { smoothScroll } from "@/utils/smoothScroll";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  useEffect(() => {
    const scroll = smoothScroll();
    return () => scroll.destroy();
  }, []);

  return (
    <Fragment>
      <Menu />

      <div className="px-32 py-20 mt-24 flex flex-col gap-20 min-h-[calc(100vh-6rem)]">
        {children}
      </div>

      <div className="fixed bottom-8 right-8">
        <RoundedButton icon="Globe" />
      </div>

      <Footer />
    </Fragment>
  );
}
