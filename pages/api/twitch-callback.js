import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import querystring from 'querystring';

const clientId = '4xuj4pcbyu4cgvaxqdr5ruwgbwtrhr';
const clientSecret = '8xbq4vsr34v709cd5z473wlqjkzxar';
const redirectUri = 'http://localhost:3000/callback';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const { code } = router.query;

        if (!code) {
          throw new Error('Authorization code not found');
        }

        const { data } = await axios.post('https://id.twitch.tv/oauth2/token', querystring.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAccessToken();
  }, [router.query]);

  return (
    <div>
      <h1>Callback Page</h1>
    </div>
  );
}
