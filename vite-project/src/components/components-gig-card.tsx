import { Heart, Star, UserRound } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface GigCardProps {
  title: string;
  description: string;
  freelancer: string;
  sellerImage: string;
  total_amount: number;
}

export function GigCard({ 
  title, 
  description, 
  freelancer, 
  sellerImage,
  total_amount, 
}: GigCardProps) {
  return (
    <Card className="overflow-hidden bg-zinc-900 border-zinc-800">
      <CardHeader className="p-0">
        <div className="relative">
          <a href='/details'>
            <img src={sellerImage} alt={title} className="w-full h-48 object-cover" />
            <Heart className="absolute top-2 right-2 text-white hover:text-red-500 cursor-pointer" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <UserRound className="w-10 h-10 text-zinc-400 mr-3" />
          <div>
            <p className="text-zinc-300 font-medium">{freelancer}</p>
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
          <span className="text-white font-bold">£{total_amount}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default GigCard;