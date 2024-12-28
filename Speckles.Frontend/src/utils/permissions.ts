import { IStudio } from "@/types/Studio.types";

export function canEditStudio(studio: IStudio, userId: string) {
  return studio.members.some((x) => x.memberId === userId);
}
