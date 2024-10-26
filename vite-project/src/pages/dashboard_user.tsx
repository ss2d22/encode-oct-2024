import { useEffect, useRef, useState } from 'react'
import { UserRound, Star, GitBranch, GitCommit, Bell, Plus } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Jobs, columns } from "@/components/columns"
import { DataTable } from "@/components/datatable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AcceptJobDrawer from "@/components/acceptJobDrawer"

const Dashboard = () => {
    const [username, setUsername] = useState("Your Name")
    const [description, setDescription] = useState("Write your description")
    const [projectName, setProjectName] = useState("Project Name")
    const [skills, setSkills] = useState("Write your skills")
    const [workTitle, setWorkTitle] = useState("Work Title")
    const [company, setCompany] = useState("Company Name")
    const [year, setYear] = useState("Duration")
    const [workdes, setWorkDes] = useState("Write the job description")
    const [tempUsername, setTempUsername] = useState(username)
    const [tempDescription, setTempDescription] = useState(description)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialog2Open, setDialog2Open] = useState(false)
    const [dialog3Open, setDialog3Open] = useState(false)

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

    const handleSaveChanges = () => {
        setUsername(tempUsername)
        setDescription(tempDescription)
        setDialogOpen(false)
    }

    const handleSavePP = () => {
        setDialog2Open(false)
    }

    const handleSaveWE = () => {
        setDialog3Open(false)
    }

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
        <div className="relative min-h-screen overflow-hidden bg-black text-white font-sans">
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ mixBlendMode: 'screen' }}
            />
            <div className="relative z-10 flex flex-col p-4 space-y-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
                    <div className="flex items-center space-x-4">
                        <UserRound className="h-20 w-20 text-blue-300" />
                        <div>
                            <h1 className="text-2xl font-bold text-blue-100">{username}</h1>
                            <p className="text-blue-200">{description}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="bg-blue-500 bg-opacity-20 text-blue-100 hover:bg-blue-600 hover:bg-opacity-30">Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-gray-800 bg-opacity-90 backdrop-blur-md text-white">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription className="text-gray-300">
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right text-gray-300">
                                            Name
                                        </Label>
                                        <Input
                                            id="nameInput"
                                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                                            value={tempUsername}
                                            onChange={e => setTempUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right text-gray-300">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                                            value={tempDescription}
                                            onChange={e => setTempDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" onClick={handleSaveChanges} className="bg-blue-500 text-white hover:bg-blue-600">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <AcceptJobDrawer />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-purple-800 bg-opacity-20 backdrop-blur-md border-purple-500 border-opacity-30">
                        <CardHeader>
                            <CardTitle className="text-purple-100">Current Jobs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={jobsList} />
                        </CardContent>
                    </Card>

                    <Card className="bg-green-800 bg-opacity-20 backdrop-blur-md border-green-500 border-opacity-30">
                        <CardHeader>
                            <CardTitle className="text-green-100">GitHub Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center">
                                    <Star className="h-8 w-8 text-yellow-300 mb-2" />
                                    <span className="text-2xl font-bold text-yellow-100">{githubStats.stars}</span>
                                    <span className="text-sm text-yellow-200">Stars</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <GitCommit className="h-8 w-8 text-green-300 mb-2" />
                                    <span className="text-2xl font-bold text-green-100">{githubStats.commits}</span>
                                    <span className="text-sm text-green-200">Commits</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <GitBranch className="h-8 w-8 text-blue-300 mb-2" />
                                    <span className="text-2xl font-bold text-blue-100">{githubStats.pullRequests}</span>
                                    <span className="text-sm text-blue-200">Pull Requests</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Bell className="h-8 w-8 text-red-300 mb-2" />
                                    <span className="text-2xl font-bold text-red-100">{githubStats.issues}</span>
                                    <span className="text-sm text-red-200">Issues</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-800 bg-opacity-20 backdrop-blur-md border-blue-500 border-opacity-30">
                        <CardHeader>
                            <CardTitle className="text-blue-100">Personal Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {personalProjects.map((project, index) => (
                                    <li key={index} className="bg-blue-700 bg-opacity-30 p-2 rounded">
                                        <h3 className="font-semibold text-blue-100">{project.name}</h3>
                                        <p className="text-sm text-blue-200">{project.tech}</p>
                                    </li>
                                ))}
                            </ul>
                            <Dialog open={dialog2Open} onOpenChange={setDialog2Open}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full mt-4 bg-blue-500 bg-opacity-20 text-blue-100 hover:bg-blue-600 hover:bg-opacity-30">
                                        <Plus className="mr-2 h-4 w-4" /> Add New Project
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-gray-800 bg-opacity-90 backdrop-blur-md text-white">
                                    <DialogHeader>
                                        <DialogTitle>Add New Personal Project</DialogTitle>
                                        <DialogDescription className="text-gray-300">
                                            Add a new personal project here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="projectName" className="text-right text-gray-300">
                                                Project Name
                                            </Label>
                                            <Input
                                                id="projectName"
                                                className="col-span-3 bg-gray-700 border-gray-600 text-white"
                                                value={projectName}
                                                onChange={e => setProjectName(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="skills" className="text-right text-gray-300">
                                                Skills Used
                                            </Label>
                                            <Input
                                                id="skills"
                                                className="col-span-3 bg-gray-700 border-gray-600 text-white"
                                                value={skills}
                                                onChange={e => setSkills(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleSavePP} className="bg-blue-500 text-white hover:bg-blue-600">Save Project</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-orange-800 bg-opacity-20 backdrop-blur-md border-orange-500 border-opacity-30">
                    <CardHeader>
                        <CardTitle className="text-orange-100">Work Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {workExperience.map((job, index) => (
                                <div key={index} className="bg-orange-700 bg-opacity-30 p-4 rounded">
                                    <h3 className="font-semibold text-lg text-orange-100">{job.role}</h3>
                                    <p className="text-sm text-orange-200">{job.company} | {job.period}</p>
                                    <p  className="mt-2 text-sm text-orange-100">{job.responsibilities}</p>
                                </div>
                            ))}
                        </div>
                        <Dialog open={dialog3Open} onOpenChange={setDialog3Open}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full mt-4 bg-orange-500 bg-opacity-20 text-orange-100 hover:bg-orange-600 hover:bg-opacity-30">
                                    <Plus className="mr-2 h-4 w-4" /> Add New Work Experience
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-gray-800 bg-opacity-90 backdrop-blur-md text-white">
                                <DialogHeader>
                                    <DialogTitle>Add New Work Experience</DialogTitle>
                                    <DialogDescription className="text-gray-300">
                                        Add new work experience here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="workTitle" className="text-right text-gray-300">
                                            Job Title
                                        </Label>
                                        <Input
                                            id="workTitle"
                                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                                            value={workTitle}
                                            onChange={e => setWorkTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="company" className="text-right text-gray-300">
                                            Company Name
                                        </Label>
                                        <Input
                                            id="company"
                                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                                            value={company}
                                            onChange={e => setCompany(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="year" className="text-right text-gray-300">
                                            Duration
                                        </Label>
                                        <Input
                                            id="year"
                                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                                            value={year}
                                            onChange={e => setYear(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="workdes" className="text-right text-gray-300">
                                            Job Description
                                        </Label>
                                        <Input
                                            id="workdes"
                                            className="col-span-3 bg-gray-700 border-gray-600 text-white"
                                            value={workdes}
                                            onChange={e => setWorkDes(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" onClick={handleSaveWE} className="bg-orange-500 text-white hover:bg-orange-600">Save Experience</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard