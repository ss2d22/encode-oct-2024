import { Heart, Star, UserRound } from 'lucide-react'

interface GigCardProps {
  title: string
  subtitle: string
  sellerName: string
  sellerImage: string
  rating: number
  reviewCount: number
  startingPrice: number
}

export function GigCard({ 
  title, 
  subtitle, 
  sellerName, 
  rating, 
  reviewCount, 
  startingPrice, 
}: GigCardProps) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <div className="bg-gray-700 p-6 rounded-t-lg">
          <div className="bg-white p-4 rounded-lg relative">
            <Heart className="absolute top-2 right-2 text-gray-400" />
            <h2 className="text-3xl font-bold">
              <span className="text-slate-800">{title.split(' ')[0]}</span>{' '}
              {title.split(' ').slice(1).join(' ')}
            </h2>
            <p className="text-gray-600 mt-2">{subtitle}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1 pb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
          ))}
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center mb-2">
          <UserRound className="w-10 h-10 rounded-full mr-4" />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Ad by {sellerName}</p>
          </div>
        </div>
        <p className="text-gray-700 text-base">
          I will code HTML CSS javascript PHP web application
        </p>
        <div className="flex items-center mt-4">
          <Star className="text-yellow-400 w-5 h-5 fill-current" />
          <span className="text-yellow-400 ml-1 font-bold">{rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1">({reviewCount})</span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-gray-500 text-sm">From</span>
        <span className="text-gray-900 text-xl font-bold ml-1">£{startingPrice}</span>
      </div>
    </div>
  )
}

export default GigCard