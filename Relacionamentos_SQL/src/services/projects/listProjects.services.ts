import { QueryResult, QueryConfig } from "pg";
import { client } from "../../database";

import { ProjectWithTechnology } from "../../interfaces/projects.interface";

const listProjectsService = async (): Promise<Array<ProjectWithTechnology>> => {
  const queryString: string = `
    SELECT
    "proj"."id" "projectId",
    "proj"."name" "projectName",
    "proj"."description" "projectDescription",
    "proj"."estimatedTime" "projectEstimatedTime",
    "proj"."repository" "projectRepository",
    "proj"."startDate" "projectStartDate",
    "proj"."endDate" "projectEndDate",
    "proj"."developerId" "projectDeveloperID",
    "tech"."id" "technologyID",
    "tech"."name" "technologyName"

    FROM projects AS "proj"
    LEFT JOIN 
    projects_technologies AS "pt" ON "proj"."id" = "pt"."projectId"
    LEFT JOIN 
    technologies AS "tech" ON "pt"."technologyId" = "tech"."id";
    `;

  const queryResult: QueryResult<ProjectWithTechnology> = await client.query(
    queryString
  );

  return queryResult.rows;
};

const listProjectService = async (
  projectId: string
): Promise<Array<ProjectWithTechnology>> => {
  const queryString: string = `
      SELECT
      "proj"."id" "projectId",
      "proj"."name" "projectName",
      "proj"."description" "projectDescription",
      "proj"."estimatedTime" "projectEstimatedTime",
      "proj"."repository" "projectRepository",
      "proj"."startDate" "projectStartDate",
      "proj"."endDate" "projectEndDate",
      "proj"."developerId" "projectDeveloperID",
      "tech"."id" "technologyID",
      "tech"."name" "technologyName"
  
      FROM projects AS "proj"
      LEFT JOIN 
      projects_technologies AS "pt" ON "proj"."id" = "pt"."projectId"
      LEFT JOIN 
      technologies AS "tech" ON "pt"."technologyId" = "tech"."id"
      WHERE "proj"."id" = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [projectId],
  };

  const queryResult: QueryResult<ProjectWithTechnology> = await client.query(
    queryConfig
  );

  console.log(queryResult);

  return queryResult.rows;
};

export { listProjectsService, listProjectService };
