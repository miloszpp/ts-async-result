export type AsyncResult<TResult, TError = unknown> =
  | AsyncInProgress
  | AsyncSuccess<TResult>
  | AsyncFailure<TError>;

interface AsyncInProgress {
  type: "inProgress";
}

interface AsyncSuccess<TResult> {
  type: "success";
  value: TResult;
}

interface AsyncFailure<TError> {
  type: "failure";
  error: TError;
}

export const asAsyncSuccess = <TResult>(
  value: TResult
): AsyncSuccess<TResult> => ({ type: "success", value });

export const ASYNC_IN_PROGRESS: AsyncInProgress = { type: "inProgress" };

export const asAsyncFailure = <TError>(
  error: TError
): AsyncFailure<TError> => ({ type: "failure", error });
