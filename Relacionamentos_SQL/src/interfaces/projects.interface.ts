type Project = {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: Date;
  endDate: Date | null | undefined;
  developerId: number;
};

type ProjectRequest = Omit<Project, "id">;
type ProjectUpdate = Partial<ProjectRequest>;

type ProjectWithTechnology = {
  projectID: number;
  projectName: string;
  projectDescription: string;
  projectEstimatedTime: string;
  projectRepository: string;
  projectStartDate: string;
  projectEndDate: Date | null | undefined;
  projectDeveloperID: number;
  technologyID: number | null | undefined;
  technologyName: string | null | undefined;
};

type ProjectWithTechnologyWithoutDev = {
  projectID: number;
  projectName: string;
  projectDescription: string;
  projectEstimatedTime: string;
  projectRepository: string;
  projectStartDate: string;
  projectEndDate: Date | null | undefined;
  technologyID: number | null | undefined;
  technologyName: string | null | undefined;
};

type Technologie = {
  id: number;
  name: string;
};

type TechnologieRequest = Omit<Technologie, "id">;

export {
  Project,
  ProjectRequest,
  ProjectUpdate,
  ProjectWithTechnology,
  Technologie,
  TechnologieRequest,
  ProjectWithTechnologyWithoutDev,
};
