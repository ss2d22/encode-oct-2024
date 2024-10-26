"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 

export type Jobs = {
        id: string
        jobName: string
        totalAmount: string
        status: "Open" | "In Progress" | "UnderDispute" | "Completed" | "Cancelled"
        deadline: string
}
 
export const columns: ColumnDef<Jobs>[] = [
    {
        accessorKey: "jobName",
        header: "Job Name",
    },
    {
        accessorKey: "totalAmount",
        header: "Total Amount",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "deadline",
        header: "Deadline",
    }
]