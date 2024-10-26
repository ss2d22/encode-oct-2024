import { Bell } from "lucide-react"
import { Button } from "./ui/button"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "./ui/drawer"

const AcceptJobDrawer =  () => {
    return (
        <Drawer>
            <DrawerTrigger><Bell className="text-white"/></DrawerTrigger>
            <DrawerContent>
            <DrawerHeader className="flex justify-between">
                <div className="flex flex-col">
                    <DrawerTitle>Job Offers Avaliable</DrawerTitle>
                    <DrawerDescription>Please review the jobs offered below</DrawerDescription>
                </div>
                <DrawerClose className="flex w-[5%] justify-center items-center">
                    <Button >Close</Button>
                </DrawerClose>
            </DrawerHeader>
            <DrawerFooter>
                <div className="flex justify-between">
                    <div className="flex flex-row space-x-6">
                        <p className="mt-2 font-bold">Job ID</p>
                        <Button >View Job Details</Button>
                    </div>
                    
                    
                    <Button>Accept</Button>
                </div>
            </DrawerFooter>
            </DrawerContent>
      </Drawer>
    )
}
export default AcceptJobDrawer