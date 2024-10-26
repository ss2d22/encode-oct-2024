"use client"

import { UserRound, Star, GitBranch, GitCommit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Jobs, columns } from "@/components/columns"
import { DataTable } from "@/components/datatable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardUser() {
    const [username, setUsername] = useState("Your Name");
    const [description, setDescription] = useState("Write your description");
    const [tempUsername, setTempUsername] = useState(username);
    const [tempDescription, setTempDescription] = useState(description);
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSaveChanges = () => {
        setUsername(tempUsername);
        setDescription(tempDescription);
        setDialogOpen(false);
    };
    
    const jobsList: Jobs[] = [
        {
            id: "1",
            jobName: "UI building",
            totalAmount: "10",
            status: "Open",
            deadline: "10 days",
        },
        {
            id: "2",
            jobName: "UX building",
            totalAmount: "20",
            status: "Open",
            deadline: "10 days",
        },
        {
            id: "3",
            jobName: "Wallet Transfer Smart Contract",
            totalAmount: "30",
            status: "Open",
            deadline: "10 days",
        },
    ]

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
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url('/backg.png')`,
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="flex flex-row w-full h-full p-4 space-x-8">
        <div className="flex flex-col items-start space-y-4 w-1/4">
          <div className="flex items-center space-x-4 ml-24">
            <UserRound className="h-20 w-20 text-white" />
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={()=>setDialogOpen(true)}>Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-zinc-900">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-white">
                      Name
                    </Label>
                    <Input
                      id="nameInput"
                      className="col-span-3 text-white"
                      value={tempUsername}
                      onChange={e => setTempUsername(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right text-white">
                      Description
                    </Label>
                    <Input
                      id="description"
                      className="col-span-3 text-white"
                      value={tempDescription}
                      onChange={e => setTempDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-10 w-full">
            <div className="ml-4">
              <p className="text-white max-w-md text-xl font-bold">
                {username}
              </p>     
              <p className="text-white max-w-md">
                {description}
              </p>
            </div>
            <div className="w-full ml-2">
              <DataTable columns={columns} data={jobsList} />
            </div>
          </div>
        </div>
        <div className="flex-grow w-3/4 pr-5">
          <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border h-full"
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
                      <Card key={index} className="mb-4 bg-zinc-800">
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
        </div>
      </div>
    </div>
  )
}