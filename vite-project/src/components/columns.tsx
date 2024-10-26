"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 

export type Jobs = {
        id: string
        jobName: string
        employer: string
        status: "pending" | "processing" | "success" | "failed"
        daysRemaining: string
}
 
export const columns: ColumnDef<Jobs>[] = [
    {
        accessorKey: "jobName",
        header: "Job Name",
    },
    {
        accessorKey: "employer",
        header: "Employer",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "daysRemaining",
        header: "Days Remaining",
    }
]