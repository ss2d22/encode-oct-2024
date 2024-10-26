"use client";
import GigCard from "@/components/jobAdCards";
import backgroundImage from "/backg.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Explore() {
  
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
        <div className="absolute w-full flex flex-col items-start justify-start px-4 sm:px-6 lg:px-8">
            <text className="text-white text-4xl font-bold">Programming</text>
            <div className="flex flex-row mt-6 space-x-6">
                <DropdownMenu>
                    <DropdownMenuTrigger className="border border-white text-white ">Programming Language</DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuItem>JavaScript</DropdownMenuItem>
                        <DropdownMenuItem>HTML&CSS</DropdownMenuItem>
                        <DropdownMenuItem>PHP</DropdownMenuItem>
                        <DropdownMenuItem>Python</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className="border border-white text-white ">Seller Details</DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuItem>Top Seller</DropdownMenuItem>
                        <DropdownMenuItem>New Seller</DropdownMenuItem>
                        <DropdownMenuItem>Credit 50 above</DropdownMenuItem>
                        <DropdownMenuItem>Credit 50 below</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className="border border-white text-white ">Budget</DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuItem>Low Price</DropdownMenuItem>
                        <DropdownMenuItem>Medium Price</DropdownMenuItem>
                        <DropdownMenuItem>High Price</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className="border border-white text-white ">Delivery Time</DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuItem>24h</DropdownMenuItem>
                        <DropdownMenuItem>1 week</DropdownMenuItem>
                        <DropdownMenuItem>1 month</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="mt-10">
                <GigCard title={"Web Development"} description={"Hi"} freelancer={"Hi"} sellerImage = {"assets/coding.jpg"} total_amount={10} />
            </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
