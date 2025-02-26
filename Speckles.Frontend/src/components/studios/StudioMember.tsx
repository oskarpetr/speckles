import { IUserShort } from "@/types/dtos/User.types";
import Avatar from "../shared/Avatar";
import { GridCardMenu } from "../shared/GridCard";
import { useState } from "react";
import { IMenuItem } from "@/types/MenuItem.types";
import { cn } from "@/utils/cn";
import DeleteStudioMemberModal from "../modals/DeleteStudioMemberModal";

interface Props {
  slug: string;
  member: IUserShort;
}

export default function StudioMember({ slug, member }: Props) {
  // hovered state
  const [hovered, setHovered] = useState(false);

  // delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // studio menu items
  const studioMenuItems: IMenuItem[] = [
    {
      text: "View profile",
      link: `/profiles/${member.username}`,
    },
    {
      text: "Remove member",
      onClick: () => setOpenDeleteModal(true),
    },
  ];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-6"
    >
      <div className="relative">
        <Avatar user={member} size={120} link />
        <div
          className={cn(
            "absolute -top-4 left-36 transition-transform",
            hovered ? "scale-100" : "scale-0"
          )}
        >
          <GridCardMenu hovered={hovered} menuItems={studioMenuItems} />
        </div>
      </div>

      <div>
        <div className="text-lg font-bold">{member.fullName}</div>
        <div className="opacity-80">{member.email}</div>
      </div>

      <DeleteStudioMemberModal
        user={member}
        slug={slug}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
    </div>
  );
}
