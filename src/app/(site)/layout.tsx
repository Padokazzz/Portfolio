import { Footer } from "@/components/layout/footer"
import { ListeningIndicator } from "@/components/layout/listening-indicator"
import { Navbar } from "@/components/layout/navbar"
import { SiteIntro } from "@/components/layout/site-intro"
import { MotionProvider } from "@/components/motion/motion-provider"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MotionProvider>
      <SiteIntro />
      <Navbar />
      {children}
      <ListeningIndicator />
      <Footer />
    </MotionProvider>
  )
}
