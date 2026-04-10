import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Calendar, Clock } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  manufactureDate: Date;
  expiryDate: Date;
  onAddToCart?: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  manufactureDate,
  expiryDate,
  onAddToCart,
}: ProductCardProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const expiry = expiryDate.getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeRemaining('Expired');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  const handleAddToCart = () => {
    if (!isExpired) {
      setIsAdded(true);
      onAddToCart?.(id);
      setTimeout(() => setIsAdded(false), 1000);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden"
      whileHover={{ y: -8, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <motion.div
        className="relative h-64 overflow-hidden bg-gray-100"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Expiry Timer Badge */}
        <motion.div
          className={`absolute top-4 right-4 px-3 py-2 rounded-lg backdrop-blur-md flex items-center gap-2 ${
            isExpired
              ? 'bg-red-500/90 text-white'
              : 'bg-white/90 text-gray-900'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Clock className="w-4 h-4" />
          <span className="text-sm font-semibold">{timeRemaining}</span>
        </motion.div>
      </motion.div>

      {/* Card Content */}
      <div className="p-6">
        {/* Product Name */}
        <motion.h3
          className="text-2xl font-bold text-gray-900 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {name}
        </motion.h3>

        {/* Price */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <span className="text-3xl font-bold text-green-600">
            ${price.toFixed(2)}
          </span>
        </motion.div>

        {/* Dates Information */}
        <motion.div
          className="space-y-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Manufactured: {formatDate(manufactureDate)}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${
            isExpired ? 'text-red-600' : 'text-gray-600'
          }`}>
            <Calendar className="w-4 h-4" />
            <span>Expires: {formatDate(expiryDate)}</span>
          </div>
        </motion.div>

        {/* Get Now Button */}
        <motion.button
          onClick={handleAddToCart}
          disabled={isExpired}
          className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            isExpired
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isAdded
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          whileHover={!isExpired ? { scale: 1.02 } : {}}
          whileTap={!isExpired ? { scale: 0.95 } : {}}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={isAdded ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.div>
          <span>
            {isExpired ? 'Product Expired' : isAdded ? 'Added!' : 'Get Now'}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}