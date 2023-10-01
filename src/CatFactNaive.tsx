import { useEffect, useState } from "react";
import { CatFact } from "./types";

export const CatFactNaive: React.FC = () => {
  const [catFact, setCatFact] = useState<CatFact | undefined>();
  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((fact) => {
        setCatFact(fact);
      });
  }, []);

  return <>{catFact && catFact.fact}</>;
};
