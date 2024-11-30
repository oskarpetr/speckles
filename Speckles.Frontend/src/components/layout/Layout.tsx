import { Fragment, ReactNode, useEffect } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import RoundedButton from "../common/RoundedButton";
import { smoothScroll } from "@/utils/smoothScroll";
import PopupTooltip from "../common/PopupTooltip";
import Section from "../common/Section";
import Input from "../forms/Input";

interface Props {
  children: ReactNode;
  belowMenu?: ReactNode;
}

export default function Layout({ children, belowMenu }: Props) {
  useEffect(() => {
    const scroll = smoothScroll();
    return () => scroll.destroy();
  }, []);

  return (
    <Fragment>
      <Menu />

      <div className="mt-24">
        {belowMenu}

        <div className="px-32 py-20 flex flex-col gap-20 min-h-[calc(100vh-6rem)]">
          {children}
        </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <PopupTooltip button={<RoundedButton icon="Globe" />} anchor="top end">
          <div className="flex flex-col gap-8 p-6 w-72">
            <div>
              <Section title="Language" />
              <Input
                name="Language"
                placeholder="Language"
                onChange={() => {}}
                onBlur={() => {}}
                value=""
                error=""
                touched={false}
              />
            </div>

            <div>
              <Section title="Currency" />
              <Input
                name="Currency"
                placeholder="Currency"
                onChange={() => {}}
                onBlur={() => {}}
                value=""
                error=""
                touched={false}
              />
            </div>
          </div>
        </PopupTooltip>
      </div>

      <Footer />
    </Fragment>
  );
}
