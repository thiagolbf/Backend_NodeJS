type Developer = {
  id: number;
  name: string;
  email: string;
  developerInfoId: number | null | undefined;
};

type DeveloperRequest = Omit<Developer, "id">;
type DeveloperUpdate = Partial<DeveloperRequest>;

type Info = {
  id: number;
  developerSince: Date;
  preferredOs: "Windows" | "Linux" | "MacOS";
};

type InfoRequest = Omit<Info, "id">;

type DevelopersWithInfo = {
  developerId: number;
  developerName: string;
  developerEmail: string;
  developerInfoId: number | null | undefined;
  developerInfoDeveloperSince: Date;
  developerInfoPreferredOS: string;
};

export {
  DeveloperRequest,
  Developer,
  DevelopersWithInfo,
  DeveloperUpdate,
  Info,
  InfoRequest,
};
