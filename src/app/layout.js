import { Inter } from 'next/font/google'
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Providers from './components/googleAuth/providers';
import CustomAppBar from './components/appbar';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Personal Planner',
  description: 'Personal Note Taker by Dylan Billings',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>    
        <Providers><CustomAppBar/>{children}</Providers>
        </body>
    </html>
  )
}
