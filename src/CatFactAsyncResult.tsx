import { useEffect, useState } from "react";
import {
  ASYNC_IN_PROGRESS,
  AsyncResult,
  asAsyncFailure,
  asAsyncSuccess,
} from "./AsyncResult";
import { CatFact } from "./types";

export const CatFactAsyncResult: React.FC = () => {
  const [catFact, setCatFact] =
    useState<AsyncResult<CatFact>>(ASYNC_IN_PROGRESS);
  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then(
        (fact) => setCatFact(asAsyncSuccess(fact)),
        (error) => setCatFact(asAsyncFailure(error))
      );
  }, []);

  if (catFact.type === "inProgress") {
    return <span>Loading...</span>;
  }
  if (catFact.type === "failure") {
    return <span>Error: {JSON.stringify(catFact.error)}</span>;
  }

  return <>{catFact.value.fact}</>;
};
