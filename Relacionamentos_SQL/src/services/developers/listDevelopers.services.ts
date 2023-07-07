import { QueryResult, QueryConfig } from "pg";
import { client } from "../../database";
import { DevelopersWithInfo } from "../../interfaces/developers.interface";

const listDevelopersService = async (): Promise<Array<DevelopersWithInfo>> => {
  const queryString: string = `
    SELECT 
    "dev"."id" "developerId",
    "dev"."name" "developerName",
    "dev"."email" "developerEmail",
    "devinfo"."id" "developerInfoId",
    "devinfo"."developerSince" "developerInfoDeveloperSince",
    "devinfo"."preferredOS" "developerInfoPreferredOS"
     
    FROM developers AS "dev"
    LEFT JOIN developer_infos AS "devinfo" 
    ON "dev"."developerInfoId" = "devinfo"."id"
   
    `;

  const queryResult: QueryResult<DevelopersWithInfo> = await client.query(
    queryString
  );

  return queryResult.rows;
};

const listDeveloperService = async (
  developerId: string
): Promise<Array<DevelopersWithInfo>> => {
  const queryString: string = `
    SELECT 
    "dev"."id" "developerId",
    "dev"."name" "developerName",
    "dev"."email" "developerEmail",
    "devinfo"."id" "developerInfoId",
    "devinfo"."developerSince" "developerInfoDeveloperSince",
    "devinfo"."preferredOS" "developerInfoPreferredOS"
     
    FROM developers AS "dev"
    LEFT JOIN developer_infos AS "devinfo" 
    ON "dev"."id" = "devinfo"."id"
    WHERE "dev"."id" = $1
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: QueryResult<Array<DevelopersWithInfo>> =
    await client.query(queryConfig);

  return queryResult.rows[0];
};

export { listDevelopersService, listDeveloperService };
