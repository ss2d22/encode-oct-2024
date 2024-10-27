import { Heart, Star, UserRound } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GigCardProps {
  id: Buffer;
  title: string;
  description: string;
  freelancer: string;
  total_amount: number;
}

export function GigCard({ 
  id,
  title, 
  description, 
  freelancer, 
  total_amount, 
}: GigCardProps) {
  const [image, setImage] = useState<string>("/placeholder.svg?height=200&width=300");
  const freelancerName = freelancer.substring(0,5) + "..." + freelancer.substring(freelancer.length-5,freelancer.length)
  const api = 'https://api.api-ninjas.com/v1/randomimage?category=technology'
  async function getImage(): Promise<string> {
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: { "X-Api-Key": "fWfBe3ObLa6nxrJnscvtzg==yJ6ztsbjpLyiwbmr", Accept: "image/jpg" },
      });

      const blob = await response.blob();
      return URL.createObjectURL(blob); 
    } catch (error) {
      console.error("Error fetching image:", error);
      return "/placeholder.svg?height=200&width=300"; 
    }
  }
  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await getImage();
      setImage(imageUrl);
    };
    fetchImage();
},[]);
  const navigate = useNavigate();
  const encodedData = encodeURIComponent(Buffer.from(id).toString('base64'));

  const handleClick = () => {
    navigate(`/details/${encodedData}`);
  };
  return (
    <Card className="overflow-hidden bg-zinc-900 border-zinc-800">
      <CardHeader className="p-0">
        <div className="relative">
          <a onClick={handleClick}>
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <Heart className="absolute top-2 right-2 text-white hover:text-red-500 cursor-pointer" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <UserRound className="w-10 h-10 text-zinc-400 mr-3" />
          <div>
            <p className="text-zinc-300 font-medium">{freelancerName} </p>
            <p className="text-zinc-500 text-sm">Seller</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="bg-zinc-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Star className="text-yellow-400 w-4 h-4 mr-1" />
          <span className="text-zinc-300 text-sm">4.9 (123)</span>
        </div>
        <div>
          <span className="text-zinc-400 text-sm">From </span>
          <span className="text-white font-bold">{total_amount}XLM</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default GigCard;