import { NextRequest } from "next/server";
import {
  handleAuth,
  AppRouterOnError,
  HandlerError,
} from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

const onError: AppRouterOnError = (req: NextRequest, error: HandlerError) => {
  console.error(
    "Error occurred in Auth0 handleAuth:\nError Name:",
    error.name,
    "\nError Message:",
    error.message,
    "\nError Code:",
    error.code,
    "\nRequest:",
    req
  );
  if (
    req.nextUrl.searchParams
      .get("error_description")
      ?.startsWith("Verify your email")
  )
    redirect(`/error/notverify${req.nextUrl.search}`);
  redirect(`/error/internalerror${req.nextUrl.search}`);
};

export const GET = handleAuth({
  onError,
});
