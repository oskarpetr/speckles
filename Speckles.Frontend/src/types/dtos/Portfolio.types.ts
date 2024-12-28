import { IProject } from "./Project.types";

export interface IPortfolio {
  portfolioId: string;
  about: string;
  projects: IProject[];
}
