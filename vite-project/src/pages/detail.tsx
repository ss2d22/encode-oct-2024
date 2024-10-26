"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Star, GitCommit, GitBranch } from "lucide-react";
import backgroundImage from "/backg.png";
import { Alert } from "@/components/ui/alert";


function Details() {
    const githubStats = {
        stars: 120,
        commits: 450,
        pullRequests: 35,
        issues: 12
    }

    const personalProjects = [
        { name: "Personal Portfolio", tech: "Next.js, Tailwind CSS" },
        { name: "Task Manager App", tech: "React, Redux, Node.js" },
        { name: "Weather Dashboard", tech: "Vue.js, OpenWeatherMap API" },
        { name: "E-commerce Platform", tech: "MERN Stack" }
    ]

    const workExperience = [
        { 
            company: "Tech Innovators Inc.", 
            role: "Senior Frontend Developer",
            period: "2021 - Present",
            responsibilities: "Lead UI/UX development, mentored junior developers"
        },
        { 
            company: "Digital Solutions Ltd.", 
            role: "Full Stack Developer",
            period: "2018 - 2021",
            responsibilities: "Developed and maintained web applications"
        },
        { 
            company: "StartUp Ventures", 
            role: "Junior Developer",
            period: "2016 - 2018",
            responsibilities: "Assisted in building MVPs for various startups"
        }
    ]
  
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // To make the image cover the whole div
          backgroundPosition: "center", // Center the image
          height: "100vh", // Full height of the viewport
          width: "100vw", // Full width of the viewport
        }}
      >
        <div className="flex flex-row space-x-8">
            <div className="absolute w-[60%] flex flex-col items-start justify-start pl-16 px-4 sm:px-6 lg:px-8 space-y-4">
                <text className="text-white text-4xl font-bold">Title</text>
                <text className="text-muted-foreground text-xl">Description</text>
                <div className="flex-grow w-full h-[60%] pr-5">
            <ResizablePanelGroup
                direction="horizontal"
                className="rounded-lg border h-[60%]"
            >
                <ResizablePanel defaultSize={50} minSize={30}>
                <div className="flex flex-col h-full p-6 bg-transparent overflow-auto">
                    <h2 className="text-2xl font-bold mb-4 text-white">GitHub Stats and Graphs</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card className="bg-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">
                            Total Stars
                        </CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold text-white">{githubStats.stars}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">
                            Commits
                        </CardTitle>
                        <GitCommit className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold text-white">{githubStats.commits}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">
                            Pull Requests
                        </CardTitle>
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold text-white">{githubStats.pullRequests}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">
                            Issues
                        </CardTitle>
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold text-white">{githubStats.issues}</div>
                        </CardContent>
                    </Card>
                    </div>
                    <Card className="mb-6 bg-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Contribution Graph</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] bg-zinc-700 rounded-md"></div>
                    </CardContent>
                    </Card>
                </div>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={50} minSize={30}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50} minSize={15}>
                    <div className="flex flex-col h-full p-6 bg-transparent overflow-auto">
                        <h2 className="text-2xl font-bold mb-4 text-white">Personal Projects</h2>
                        {personalProjects.map((project, index) => (
                        <Card key={index} className="mb-4 bg-tranparent">
                            <CardHeader>
                            <CardTitle className="text-white">{project.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="text-sm text-muted-foreground">{project.tech}</p>
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={50} minSize={15}>
                    <div className="flex flex-col h-full p-6 bg-transparent overflow-auto">
                        <h2 className="text-2xl font-bold mb-4 text-white">Work Experience</h2>
                        {workExperience.map((job, index) => (
                        <Card key={index} className="mb-4 bg-zinc-800">
                            <CardHeader>
                            <CardTitle className="text-white">{job.role}</CardTitle>
                            <p className="text-sm text-muted-foreground">{job.company} | {job.period}</p>
                            </CardHeader>
                            <CardContent>
                            <p className="text-sm text-zinc-500">{job.responsibilities}</p>
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
                <Alert className="flex flex-col mt-5 bg-transparent border justify-start items-start">
                    <div className="flex flex-row space-x-12">
                        <p className="text-xl font-semibold text-white ">Reviewer</p>
                        <div className="flex justify-center items-center">
                            <Star className="text-yellow-400 w-5 h-5 fill-current" />
                            <span className="text-yellow-400 ml-1 font-bold">10.0</span>
                        </div>
                        <p className="text-md mt-1 text-muted-foreground justify-end">Time</p>
                    </div>
                    <p className="text-white">Comments</p>
                </Alert>
            </div>
        </div>

        </div>
        <div className="flex justify-end items-end pr-10 pt-10">
            <Card className="w-[40%]">
                <CardHeader className="flex items-start">
                    <CardTitle className="text-xl font-bolds">Payment</CardTitle>
                    <CardDescription>Amount</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button>Pay now</Button>
                </CardFooter>
            </Card>
        </div>
        
      </div>
    </>
  );
}

export default Details;
