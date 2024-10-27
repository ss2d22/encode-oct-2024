import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, GitCommit, GitBranch, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import deWork from "@/utils/DeWorkContractService";

const Details = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

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

  const githubStats = {
    stars: 120,
    commits: 450,
    pullRequests: 35,
    issues: 12,
  };

  const personalProjects = [
    { name: "Personal Portfolio", tech: "Next.js, Tailwind CSS" },
    { name: "Task Manager App", tech: "React, Redux, Node.js" },
    { name: "Weather Dashboard", tech: "Vue.js, OpenWeatherMap API" },
    { name: "E-commerce Platform", tech: "MERN Stack" },
  ];

  const workExperience = [
    {
      company: "Tech Innovators Inc.",
      role: "Senior Frontend Developer",
      period: "2021 - Present",
      responsibilities: "Lead UI/UX development, mentored junior developers",
    },
    {
      company: "Digital Solutions Ltd.",
      role: "Full Stack Developer",
      period: "2018 - 2021",
      responsibilities: "Developed and maintained web applications",
    },
    {
      company: "StartUp Ventures",
      role: "Junior Developer",
      period: "2016 - 2018",
      responsibilities: "Assisted in building MVPs for various startups",
    },
  ];

  return (
    
    <div className="relative min-h-screen overflow-hidden bg-black text-white font-sans">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ mixBlendMode: "screen" }}
      />
      <div className="relative z-10 flex flex-col p-4 space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-100">Project Title</h1>
            <p className="text-xl text-blue-200 mt-2">Project Description</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <Star className="text-yellow-400 w-6 h-6 fill-current" />
            <span className="text-yellow-400 ml-1 font-bold text-2xl">
              4.9
            </span>
            <span className="text-blue-200 ml-2">(123 reviews)</span>
          </div>
        </div>
        <div className="flex flex row">
          <div className="flex flex-col space-y-6 w-[50%]">
          <Card className="bg-purple-800 bg-opacity-20 backdrop-blur-md border-purple-500 border-opacity-30 w-[90%]">
            <CardHeader>
              <CardTitle className="text-purple-100">GitHub Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <Star className="h-8 w-8 text-yellow-300 mb-2" />
                  <span className="text-2xl font-bold text-yellow-100">
                    {githubStats.stars}
                  </span>
                  <span className="text-sm text-yellow-200">Stars</span>
                </div>
                <div className="flex flex-col items-center">
                  <GitCommit className="h-8 w-8 text-green-300 mb-2" />
                  <span className="text-2xl font-bold text-green-100">
                    {githubStats.commits}
                  </span>
                  <span className="text-sm text-green-200">Commits</span>
                </div>
                <div className="flex flex-col items-center">
                  <GitBranch className="h-8 w-8 text-blue-300 mb-2" />
                  <span className="text-2xl font-bold text-blue-100">
                    {githubStats.pullRequests}
                  </span>
                  <span className="text-sm text-blue-200">Pull Requests</span>
                </div>
                <div className="flex flex-col items-center">
                  <GitBranch className="h-8 w-8 text-red-300 mb-2" />
                  <span className="text-2xl font-bold text-red-100">
                    {githubStats.issues}
                  </span>
                  <span className="text-sm text-red-200">Issues</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-800 bg-opacity-20 backdrop-blur-md border-green-500 border-opacity-30  w-[90%]">
            <CardHeader>
              <CardTitle className="text-green-100">
                Personal Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {personalProjects.map((project, index) => (
                  <li
                    key={index}
                    className="bg-green-700 bg-opacity-30 p-2 rounded"
                  >
                    <h3 className="font-semibold text-green-100">
                      {project.name}
                    </h3>
                    <p className="text-sm text-green-200">{project.tech}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-800 bg-opacity-20 backdrop-blur-md border-blue-500 border-opacity-30 w-[40%]">
          <CardHeader>
            <CardTitle className="text-blue-100">Work Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workExperience.map((job, index) => (
                <div
                  key={index}
                  className="bg-blue-700 bg-opacity-30 p-4 rounded"
                >
                  <h3 className="font-semibold text-lg text-blue-100">
                    {job.role}
                  </h3>
                  <p className="text-sm text-blue-200">
                    {job.company} | {job.period}
                  </p>
                  <p className="mt-2 text-sm text-blue-100">
                    {job.responsibilities}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end mx-12">
          <Card className="w-full h-[50%] bg-orange-800 bg-opacity-20 backdrop-blur-md border-orange-500 border-opacity-30">
            <CardHeader>
              <CardTitle className="text-orange-100">Payment</CardTitle>
              <CardDescription className="text-orange-200">
                Complete your payment to start the project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-orange-100">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    placeholder="Enter amount"
                    className="bg-orange-700 bg-opacity-30 border-orange-500 border-opacity-50 text-orange-100"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Pay now
              </Button>
            </CardFooter>
          </Card>
        </div>
        </div>
        
        

        <Card className="bg-gray-800 bg-opacity-20 backdrop-blur-md border-gray-500 border-opacity-30">
          <CardHeader>
            <CardTitle className="text-gray-100">Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-700 bg-opacity-30 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-100">
                    Reviewer Name
                  </span>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 w-4 h-4 fill-current" />
                    <span className="text-yellow-400 ml-1">5.0</span>
                  </div>
                </div>
                <p className="text-gray-200">
                  Great work! Very professional and timely delivery.
                </p>
              </div>
              {/* Add more review items as needed */}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full bg-gray-700 bg-opacity-30 text-gray-100 hover:bg-gray-600 hover:bg-opacity-50"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Review
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Details;
