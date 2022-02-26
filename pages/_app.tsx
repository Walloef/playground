import "../styles/globals.scss";
import "../src/firebase/client";

import Layout from "../src/components/Layout/Layout";
import { AuthUserProvider } from "../src/providers/AuthUserContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
}

export default MyApp;
