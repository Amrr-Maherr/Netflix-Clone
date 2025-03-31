import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
