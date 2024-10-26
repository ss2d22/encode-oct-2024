"use client";
import { Link } from "react-router-dom";
import backgroundImage from "/backg.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

function Home() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // To make the image cover the whole div
          backgroundPosition: "center", // Center the image
          height: "100vh", // Full height of the viewport
          width: "100vw", // Full width of the viewport
          display: "flex",           // Add this
          alignItems: "center",       // Center vertically
          justifyContent: "center",
        }}
      >
        <div className="absolute w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8 text-center mt-2">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Ready to get your perfect freelance job?
            </h1>
            <div className="flex w-full max-w-md mx-auto">
              <Input 
                type="text" 
                placeholder="Search freelance" 
                className="flex-grow text-gray-100"
              />
              <Button type="submit" className="ml-2 bg-zinc-800">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
