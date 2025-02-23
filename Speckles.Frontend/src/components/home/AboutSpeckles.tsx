import { cn } from "@/utils/cn";
import Icon from "../shared/Icon";
import { layoutSectionPadding } from "../layout/LayoutSection";
import Separator from "../shared/Separator";
import Button from "../shared/Button";
import Link from "next/link";

export default function AboutSpeckles() {
  return (
    <div className={cn("bg-green-light", layoutSectionPadding)}>
      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          <div className="flex flex-col gap-2">
            <Icon name="Compass" size={40} />
            <h3 className="text-xl font-bold mt-2">Discover Unique Assets</h3>
            <p className="opacity-80 leading-relaxed">
              Explore curated digital assets to elevate your projects for
              studios and freelance creators seeking standout tools.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Icon name="Sparkle" size={40} />
            <h3 className="text-xl font-bold mt-2">Empower Your Creativity</h3>
            <p className="opacity-80 leading-relaxed">
              Bring your vision to life with assets crafted to spark ideas and
              streamline your workflow. Designed by creators, for creators.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Icon name="Users" size={40} />
            <h3 className="text-xl font-bold mt-2">
              Join the Creative Community
            </h3>
            <p className="opacity-80 leading-relaxed">
              Speckles is more than a marketplace—it&apos;s a space to connect,
              collaborate, and grow with fellow designers.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <Separator />
      </div>

      <div>
        <div className="flex flex-col items-center gap-4 w-full">
          <Link href="/register">
            <Button
              text="See For Yourself"
              fullWidth={false}
              size="small"
              icon={{ name: "ArrowRight", iconDirection: "right" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
