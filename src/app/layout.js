import "./globals.css";
import Providers from "../../src/app/providers.jsx";

export const metadata = {
  title: "Netflix",
  description: "Watch TV shows and movies online",
  icons: {
    icon: "/Assets/netflix-logo-icon.svg",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
