import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

// <QueryExample> is a "wrapper" HoC of <Example> with the React Query Context
// it is basically a copypaste of https://tanstack.com/query/v4/docs/overview#enough-talk-show-me-some-code-already
export default function QueryExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  );

  if (isLoading) return <p>"Loading..."</p>;

  // "assertedError" is a Perry hack to override "error" being of type "unknown" by default (i.e. unworkable by default: TS throws error if you try "error.message" where error is "unknown")
  const errorAsAny: any = error;

  if (errorAsAny)
    return <p>{"An error has occurred: " + errorAsAny.message}</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
