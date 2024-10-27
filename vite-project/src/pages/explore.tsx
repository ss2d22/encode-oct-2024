"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GigCard from "@/components/components-gig-card";
import CreateJobButton from "@/components/components-create-job-button";
import deWork from "@/utils/DeWorkContractService";

const Explore = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceListings = await deWork.get_services();
        const response = await serviceListings.signAndSend({ force: true });
        const resolvedServices = response.result.map((service) => ({
          id: Array.from(service.id)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""),
          serviceID: service.id,
          freelancer: service.freelancer,
          title: service.title,
          price: service.price,
          weekly_limit: service.weekly_limit,
          active_jobs: service.active_jobs,
          contact: service.contact,
        }));

        setServices(resolvedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawBeam = (x: number, y: number, radius: number) => {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;
      for (let i = 0; i < 5; i++) {
        const x =
          Math.sin(time + i * 1.5) * canvas.width * 0.3 + canvas.width * 0.5;
        const y =
          Math.cos(time + i * 1.5) * canvas.height * 0.3 + canvas.height * 0.5;
        drawBeam(x, y, 150 + Math.sin(time * 2 + i) * 50);
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);



  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ mixBlendMode: "screen" }}
      />
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6">Programming</h1>
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="flex flex-wrap gap-4 mb-4 lg:mb-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">Programming Language</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>JavaScript</DropdownMenuItem>
                  <DropdownMenuItem>HTML&CSS</DropdownMenuItem>
                  <DropdownMenuItem>PHP</DropdownMenuItem>
                  <DropdownMenuItem>Python</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">Seller Details</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Top Seller</DropdownMenuItem>
                  <DropdownMenuItem>New Seller</DropdownMenuItem>
                  <DropdownMenuItem>Credit 50 above</DropdownMenuItem>
                  <DropdownMenuItem>Credit 50 below</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">Budget</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Low Price</DropdownMenuItem>
                  <DropdownMenuItem>Medium Price</DropdownMenuItem>
                  <DropdownMenuItem>High Price</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">Delivery Time</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>24h</DropdownMenuItem>
                  <DropdownMenuItem>1 week</DropdownMenuItem>
                  <DropdownMenuItem>1 month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CreateJobButton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <GigCard
                id={service.serviceID}
                key={service.id}
                title={service.title}
                description={`${service.active_jobs} active jobs. Contact: ${service.contact}`}
                freelancer={service.freelancer}
                total_amount={service.price}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Explore;
