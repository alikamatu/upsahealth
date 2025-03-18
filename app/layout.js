import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import { UserProfileProvider } from "./context/UserProfileContext";

// Importing Poppins font from Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Mental Health Support & Resources | UPSA Health",
  description:
    "Access mental health resources, self-assessment tools, and expert guidance to improve well-being. Join our supportive community today.",
  keywords:
    "mental health, wellness, therapy, self-care, mental health support, online therapy, counseling, stress management, mental health resources",
  author: "UPSA Health Team",
  robots: "index, follow",
  openGraph: {
    title: "Mental Health Support & Resources | UPSA Health",
    description:
      "Explore expert mental health guidance, self-assessment tools, and a supportive community to improve your well-being.",
    url: "https://yourwebsite.com", // Replace with actual website URL
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg", // Replace with an actual image URL
        width: 1200,
        height: 630,
        alt: "Mental Health Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle", // Replace with actual Twitter handle
    title: "Mental Health Support & Resources | UPSA Health",
    description:
      "Find mental health resources, self-assessment tools, and a supportive community to improve your well-being.",
    image: "https://yourwebsite.com/twitter-image.jpg", // Replace with actual image
  },
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in the public directory
  },
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <UserProfileProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased text-black`}
      >
        {children}
      </body>
    </html>
      </UserProfileProvider>
      </ThemeProvider>
  );
}
