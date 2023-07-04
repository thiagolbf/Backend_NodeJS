type ListRequiredKeys = "listName" | "data";
type DataRequiredKeys = "name" | "quantity";

interface List {
  listName: string;
  data: Data[];
}

interface Data {
  name: string;
  quantity: string;
}

interface ListWithId extends List {
  id: number;
}

export { ListRequiredKeys, DataRequiredKeys, List, ListWithId, Data };
