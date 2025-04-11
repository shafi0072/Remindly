import "@/styles/app.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import RootLayout from "@/src/components/layout/RootLayout";
import { ThemeProvider, CssBaseline } from '@mui/material';
import  { createAppTheme } from "@/src/config/theme"
Amplify.configure(outputs);

export default function App({ Component, pageProps }: AppProps) {
  const mode = 'light'; // or 'dark'
  const theme = createAppTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
    </ThemeProvider>
  );
}
