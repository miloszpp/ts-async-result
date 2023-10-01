import "./App.css";
import { CatFactAsyncResult } from "./CatFactAsyncResult";
import { CatFactAsyncResultHook } from "./CatFactAsyncResultHook";
import { CatFactNaive } from "./CatFactNaive";

function App() {
  return (
    <>
      <h2>Naive approach</h2>
      <CatFactNaive />
      <h2>AsyncResult</h2>
      <CatFactAsyncResult />
      <h2>AsyncResult utility</h2>
      <CatFactAsyncResultHook />
    </>
  );
}

export default App;
