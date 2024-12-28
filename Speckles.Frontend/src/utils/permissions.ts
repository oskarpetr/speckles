import { IStudio } from "@/types/dtos/Studio.types";

export function canEditStudio(studio: IStudio, userId: string) {
  return studio.members.some((x) => x.userId === userId);
}
