"use client";

import { Fragment, ReactNode, useEffect } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import RoundedButton from "../shared/RoundedButton";
import { smoothScroll } from "@/utils/smoothScroll";
import PopupTooltip from "../shared/PopupTooltip";
import Input from "../forms/Input";
import Promotion from "./Promotion";

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

      <div className="fixed bottom-8 right-8">
        <PopupTooltip button={<RoundedButton icon="Globe" />} anchor="top end">
          <div className="flex flex-col gap-8 p-6 w-72">
            <Input
              title="Language"
              name="Language"
              placeholder="Language"
              onChange={() => {}}
              onBlur={() => {}}
              value=""
              error=""
              touched={false}
            />

            <Input
              title="Currency"
              name="Currency"
              placeholder="Currency"
              onChange={() => {}}
              onBlur={() => {}}
              value=""
              error=""
              touched={false}
            />
          </div>
        </PopupTooltip>
      </div>

      {aboveFooter}
      <Footer />
    </Fragment>
  );
}
