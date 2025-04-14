import "@/styles/app.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import RootLayout from "@/src/components/layout/RootLayout";
import AuthLayout from "@/src/components/layout/AuthLayout";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "@/src/config/theme";
import { useRouter } from "next/router";
import AuthContext from "@/src/Context/AuthContext";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-big-calendar/lib/css/react-big-calendar.css';
Amplify.configure(outputs);

export default function App({ Component, pageProps }: AppProps) {
  const mode = "light"; // or 'dark'
  const theme = createAppTheme(mode);
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContext>
          <CssBaseline />
          {!pathname?.startsWith("/auth/") ? (
            <RootLayout>
              <Component {...pageProps} />
            </RootLayout>
          ) : pathname?.startsWith("/auth/") ? (
            <AuthLayout>
              <Component {...pageProps} />
            </AuthLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </AuthContext>
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
