import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateJobButton: React.FC = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [deadline, setDeadline] = useState("");

    const postNewJob = () => {
        // Add form submission logic here
        console.log("Posting new job:", { jobTitle, jobDescription, totalAmount, deadline });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Add new job listing</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white border-zinc-800">
                <DialogHeader>
                    <DialogTitle>Add new job listing</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Add new job listing. Make sure you check before you post the new job listing.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="jobTitle" className="text-right">
                            Job Title
                        </Label>
                        <Input
                            id="jobTitle"
                            className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                            value={jobTitle}
                            onChange={e => setJobTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="jobDescription" className="text-right">
                            Job Description
                        </Label>
                        <Input
                            id="jobDescription"
                            className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                            value={jobDescription}
                            onChange={e => setJobDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="totalAmount" className="text-right">
                            Total Amount
                        </Label>
                        <Input
                            id="totalAmount"
                            className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                            value={totalAmount}
                            onChange={e => setTotalAmount(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="deadline" className="text-right">
                            Deadline
                        </Label>
                        <Input
                            id="deadline"
                            className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={postNewJob}>Post New Job</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateJobButton;