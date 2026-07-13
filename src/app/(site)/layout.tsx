import { Footer } from "@/components/layout/footer"
import { ListeningIndicator } from "@/components/layout/listening-indicator"
import { Navbar } from "@/components/layout/navbar"
import { SiteIntro } from "@/components/layout/site-intro"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteIntro />
      <Navbar />
      {children}
      <ListeningIndicator />
      <Footer />
    </>
  )
}
