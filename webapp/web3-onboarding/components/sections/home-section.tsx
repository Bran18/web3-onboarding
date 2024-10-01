import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggler'

const categories = [
  { title: "Start Your Journey", description: "Begin your transition from Web2 to Web3 with personalized learning paths.", link: "/learning-paths" },
  { title: "Interactive Tutorials", description: "Learn by doing with our hands-on Web3 tutorials.", link: "/tutorials" },
  { title: "AI Assistant", description: "Get personalized help and answers to your Web3 questions.", link: "/ai-assistant" },
  { title: "Web3 Sandbox", description: "Practice Web3 interactions in a safe, simulated environment.", link: "/sandbox" },
  { title: "Track Your Progress", description: "Monitor your learning journey and earn achievements.", link: "/progress" },
]

export function HomeSection() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Web3 Onboarding</h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center neon-text">Welcome to Web3 Onboarding</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 crypto-card">
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{category.description}</p>
                <Link href={category.link} passHref>
                  <Button className="w-full web3-gradient-bg">Explore</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <footer className="container mx-auto py-4 text-center">
        © 2024 Web3 Onboarding. All rights reserved.
      </footer>
    </div>
  )
}