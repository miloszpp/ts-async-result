import { useEffect, useState } from "react";
import {
  ASYNC_IN_PROGRESS,
  AsyncResult,
  asAsyncFailure,
  asAsyncSuccess,
} from "./AsyncResult";

export const useGetResult = <TResult, TError = unknown>(url: string) => {
  const [result, setResult] =
    useState<AsyncResult<TResult, TError>>(ASYNC_IN_PROGRESS);

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((response) => response.json() as TResult)
      .then(
        (value) => setResult(asAsyncSuccess(value)),
        (error: TError) => setResult(asAsyncFailure(error))
      );
  }, [url]);

  return result;
};

export const flatMapAsync = <V, TargetV = V, E = unknown>(
  asyncValue: AsyncResult<V, E>,
  select: (value: V) => AsyncResult<TargetV, E>
) => {
  if (asyncValue.type === "inProgress") {
    return ASYNC_IN_PROGRESS;
  }
  if (asyncValue.type === "failure") {
    return asyncValue;
  }
  return select(asyncValue.value);
};

export const allAsync = <TResult1, TResult2, TError1, TError2>(
  result1: AsyncResult<TResult1, TError1>,
  result2: AsyncResult<TResult2, TError2>
): AsyncResult<[TResult1, TResult2], TError1 | TError2> => {
  if (result1.type === "success" && result2.type === "success") {
    return asAsyncSuccess([result1.value, result2.value]);
  }
  if (result1.type === "failure") {
    return result1;
  }
  if (result2.type === "failure") {
    return result2;
  }
  return ASYNC_IN_PROGRESS;
};
