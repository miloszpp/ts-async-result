import { CatFact } from "./types";
import { useGetResult } from "./utils";

export const CatFactAsyncResultHook: React.FC = () => {
  const catFact = useGetResult<CatFact>("https://catfact.ninja/fact");

  if (catFact.type === "inProgress") {
    return <span>Loading...</span>;
  }
  if (catFact.type === "failure") {
    return <span>Error: {JSON.stringify(catFact.error)}</span>;
  }

  return <>{catFact.value.fact}</>;
};
