import axios, { AxiosResponse } from "axios";

export async function getAuth0M2MToken(manageAPI: boolean) {
  try {
    const options = {
      method: "POST",
      url: process.env.URL_AT!,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        client_id: manageAPI
          ? process.env.AUTH0_ACCOUNT_MANAGE_CLIENT_ID!
          : process.env.AUTH0_CLIENT_ID!,
        client_secret: manageAPI
          ? process.env.AUTH0_ACCOUNT_MANAGE_CLIENT_SECRET!
          : process.env.AUTH0_CLIENT_SECRET!,
        audience: manageAPI
          ? process.env.AUTH0_AUD_MANAGE!
          : process.env.AUTH0_AWS_AUDIENCE!,
        grant_type: "client_credentials",
      }),
    };

    const response: AxiosResponse = await axios(options);
    return response.data.access_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
