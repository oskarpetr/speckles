"use client";

import { Fragment, ReactNode, useEffect } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { smoothScroll } from "@/utils/smoothScroll";
import Promotion from "./Promotion";
import Preferences from "./Preferences";

interface Props {
  children: ReactNode;
  belowMenu?: ReactNode;
  aboveFooter?: ReactNode;
}

export default function Layout({ children, belowMenu, aboveFooter }: Props) {
  useEffect(() => {
    const scroll = smoothScroll();
    return () => scroll.destroy();
  }, []);

  return (
    <Fragment>
      <Promotion />
      <Menu />

      <div>
        {belowMenu}
        <div className="min-h-[calc(100vh-6rem)]">{children}</div>
      </div>

      <Preferences />

      {aboveFooter}
      <Footer />
    </Fragment>
  );
}
