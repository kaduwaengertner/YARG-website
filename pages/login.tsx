import Head from 'next/head'
import Link from 'next/link';

function LoginPage() {
  return (
    <>
      <Head>
        <title>Login 🔓 | Kadu&apos;s Crazy Lab 🧪</title>
        <meta name="description" content="Creating a world of fun, one crazy experiment at a time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Login Page</h1>
      <Link href="/api/twitch-auth">
        Login with Twitch
      </Link>
    </>
  );
}

export default LoginPage;