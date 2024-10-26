import { Heart, Star, UserRound } from 'lucide-react'

interface GigCardProps {
  title: string
  description: string
  freelancer: string
  sellerImage: string
  total_amount: number
}

export function GigCard({ 
  title, 
  description, 
  freelancer, 
  sellerImage,
  total_amount, 
}: GigCardProps) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-transparent">
      <div className="relative">
        <div className="bg-transparent border-2 border-white rounded-t-lg">
            <a href='/details'>
                <div className="bg-white rounded-lg relative">
                    <Heart className="absolute top-2 right-2 text-white" />
                    <img src={sellerImage} className="rounded-lg" />
                </div>
            </a>
        </div>
      </div>
      <div className="px-6 py-4 bg-white">
        <div className="flex items-center mb-2">
          <UserRound className="w-10 h-10 rounded-full mr-4" />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Ad by {freelancer}</p>
          </div>
        </div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 bg-white">
        <span className="text-gray-500 text-sm">From</span>
        <span className="text-gray-900 text-xl font-bold ml-1">£{total_amount}</span>
      </div>
    </div>
  )
}

export default GigCard