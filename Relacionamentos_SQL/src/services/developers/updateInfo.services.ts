import format from "pg-format";

import { QueryResult } from "pg";
import { client } from "../../database";

import { Info, InfoRequest } from "../../interfaces/developers.interface";

const updateInfoService = async (
  payload: InfoRequest,
  developerInfoId: string
) => {
  const queryString: string = format(
    `
    UPDATE developer_infos SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryConfig = {
    text: queryString,
    values: [developerInfoId],
  };

  const queryResult: QueryResult<Info> = await client.query(queryConfig);

  console.log(queryResult);

  return queryResult.rows[0];
};

export { updateInfoService };
