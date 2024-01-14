import { useRouteError } from "react-router-dom";

type RouteError = {
  statusText?: string;
  message?: string;
};

const isError = (arg: unknown): arg is RouteError => {
  return (
    typeof arg === "object" &&
    arg !== null &&
    ("statusText" in arg || "message" in arg)
  );
};

export default function ErrorPage() {
  const error = useRouteError();
  if (isError(error)) {
    console.error(error);

    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    );
  }

  return null;
}
