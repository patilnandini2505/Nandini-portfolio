import { Bodoni_Moda, Inter, Caveat } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nandini | Creative Technologist",
  description: "Portfolio of Nandini, a Computer Science Engineering student specializing in AI & ML.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable} ${caveat.variable} antialiased`}
    >
      <body>
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}
