"use client";
import { Link } from "react-router-dom";
import backgroundImage from "/backg.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

function Home() {
  const jobCategories = [
    {
      name: "Graphic Design",
      url: "assets/graphic-design.jpg",
    }, 
    {
      name: "Programming",
      url: "assets/coding.jpg",
    },
    {
      name: "Writing/Translation",
      url: "assets/writing.jpg",
    },
    {
      name: "Media",
      url: "assets/media.jpg",
    },
    {
      name: "Tutoring",
      url: "assets/teaching.jpg",
    },
  ];
  const catCarousel = jobCategories.map((cat, id) => (
    <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <Card className="overflow-hidden border-0  bg-transparent">
          <CardContent className="p-0">
            <div 
              className="flex aspect-square items-end justify-end bg-cover bg-center p-6 opacity-[75%]"
              style={{ backgroundImage: `url(${cat.url})` }}
              aria-label={`Background image representing ${cat.url}`}
            >
              <p className="text-gray-50 text-2xl font-bold">{cat.name}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ));
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
          <div className="justify-center w-[90%] mt-10">
            <Carousel>
              <CarouselContent>
                {catCarousel}
              </CarouselContent>
              <CarouselPrevious className="bg-transparent hover:bg-transparent"/>
              <CarouselNext className="bg-transparent hover:bg-transparent"/>
            </Carousel>
            </div>
        </div>
      </div>
    </>
  );
}

export default Home;
