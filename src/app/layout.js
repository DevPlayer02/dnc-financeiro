'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: [ 'Poppins','sans-serif' ].join(','),
      fontSize: '40px',
      fontWeight: '800',
      lineHeight: '32px',
      letterSpacing: '0.08em'
    },
    h2: {
      fontFamily: [ 'Poppins','sans-serif' ].join(','),
      fontSize: '25px',
      fontWeight: '800',
      lineHeight: '32px'
    }
  },
  palette: {
    primary: {
      main: "#299D91"
    },
    background: {
      default: "#FFFFFF"
    }
  },
});


export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
