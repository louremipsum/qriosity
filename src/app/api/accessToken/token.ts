import { getAuth0M2MToken } from "./auth0";
import { decodeJwt } from "jose";
import redis from "./redis";

function getExpiration(token: string): number {
  const { exp } = decodeJwt(token);
  return exp || Math.floor(Date.now() / 1000);
}

export async function getAuth0M2MTokenWithCache(
  manageAPI: boolean
): Promise<string> {
  const audience = manageAPI
    ? process.env.AUTH0_AUD_MANAGE!
    : process.env.AUTH0_AWS_AUDIENCE!;
  try {
    const tokenFromCache = await redis.get<string>(audience);
    if (tokenFromCache) {
      console.log("Token recovered from cache");
      const exp = getExpiration(tokenFromCache);
      if (Date.now() >= exp) {
        return tokenFromCache;
      }
    }
  } catch (error) {
    console.log("There was an error recovering token from cache");
    if (error instanceof Error) {
      console.error(error.message, error);
    }
  }

  const accessToken = await getAuth0M2MToken(manageAPI);
  console.log("Generated new access token");
  try {
    await redis.set(audience, accessToken, {
      exat: getExpiration(accessToken),
    });
    console.log("Stored access token in DB");
  } catch (error) {
    console.log("There was an error storing token on cache");
    if (error instanceof Error) {
      console.error(error.message, error);
    }
  }

  return accessToken;
}
