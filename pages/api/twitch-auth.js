import querystring from "querystring";
import axios from "axios";
import cookie from "cookie";
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session.js';

const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;
const redirectUri = "https://website-git-dev-kaduwaengertner.vercel.app/api/twitch-auth";

async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    const authorizationUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user:read:email user:read:subscriptions user:read:follows`;
    res.redirect(authorizationUrl);
    return;
  }

  try {
    const { data } = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      querystring.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Twitch Access Token:" + data.access_token);

    // Save the access token in a cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("twitchAccessToken", data.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    const userInfoResponse = await axios.get(
      "https://api.twitch.tv/helix/users",
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          "Client-ID": clientId,
        },
      }
    );

    const user = { ...userInfoResponse.data.data[0], isLoggedIn: true};

    req.session.user = user;
    await req.session.save();

    // Redirect the user to the dashboard page
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);