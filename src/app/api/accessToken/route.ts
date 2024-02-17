import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest } from "next/server";
import redis from "./redis";
import { getAuth0M2MTokenWithCache } from "./token";
import { getCache } from "@/cache/ratelimitCache";

const cache = getCache();

const ratelimit = new Ratelimit({
  redis: redis,
  analytics: true,
  limiter: Ratelimit.slidingWindow(2, "3s"),
  prefix: "@upstash/ratelimit",
  ephemeralCache: cache,
});

export async function GET(request: NextRequest) {
  console.log("GET /api/accessToken\n", request);
  try {
    const id = request.ip ?? "anonymous";
    console.log("IP Address->", id);
    const limit = await ratelimit.limit(id ?? "anonymous");
    if (!limit.success) {
      return new Response("Rate limit exceeded", { status: 429 });
    }
    const secretKey = request.headers.get("x-secret-key");
    if (secretKey !== process.env.INTERNAL_SECRET_KEY) {
      return new Response("Unauthorized", { status: 403 });
    }
    const { searchParams } = new URL(request.url);
    const manageAPI = searchParams.get("manageAPI");
    if (manageAPI === null) {
      return new Response("No manageAPI parameter provided", { status: 400 });
    }
    let manageAPIBool: boolean = false;
    if (manageAPI === "true") {
      manageAPIBool = true;
    } else if (manageAPI === "false") {
      manageAPIBool = false;
    }
    const accessToken = await getAuth0M2MTokenWithCache(manageAPIBool);
    return Response.json({ accessToken: accessToken });
  } catch (error) {
    return new Response("No token obtained", { status: 500 });
  }
}
