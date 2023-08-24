import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <script
          src="https://kit.fontawesome.com/b029b65f31.js"
          crossOrigin="anonymous"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="apple-touch-icon" href="/logo192.png"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Oi&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
