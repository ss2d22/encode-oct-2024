import { useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"

export function HomePageComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawBeam = (x: number, y: number, radius: number) => {
      ctx.beginPath()
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = gradient
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const time = Date.now() * 0.001
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time + i * 1.5) * canvas.width * 0.3 + canvas.width * 0.5
        const y = Math.cos(time + i * 1.5) * canvas.height * 0.3 + canvas.height * 0.5
        drawBeam(x, y, 150 + Math.sin(time * 2 + i) * 50)
      }
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="relative z-10">
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
          <h1 className="text-5xl font-bold mb-6">Welcome to dework</h1>
          <p className="text-xl mb-8 max-w-2xl">
            The decentralized marketplace for freelancers and clients. 
            Connect, collaborate, and create without boundaries.
          </p>
          <Button size="lg">Get Started</Button>
        </main>
      </div>
    </div>
  )
}