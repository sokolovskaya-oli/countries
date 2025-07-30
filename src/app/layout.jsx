import StyledComponentsRegistry from "./lib/registry";
import { Providers } from "./providers";

export const metadata = {
  title: "Countries App",
  description: "List of countries using GraphQL API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
