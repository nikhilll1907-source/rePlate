import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { AddFoodModal, FoodData } from '../components/AddFoodModal';
import { toast } from 'sonner';

export function ProductShowcase() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);

  const handleAddToCart = (id: string) => {
    toast.success('Product added to cart!');
    console.log('Added product to cart:', id);
  };

  const handleAddFood = (foodData: FoodData) => {
    console.log('New food item:', foodData);
    // Here you would typically send this data to your backend
  };

  // Sample products with different expiry dates
  const products = [
    {
      id: '1',
      name: 'Fresh Organic Vegetables',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1657288649124-b80bdee3c17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjBmb29kJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzU4MzA0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      manufactureDate: new Date('2026-04-05'),
      expiryDate: new Date('2026-04-17'), // 7 days from now
    },
    {
      id: '2',
      name: 'Premium Snack Pack',
      price: 8.49,
      image: 'https://images.unsplash.com/photo-1739065883249-3ac226faaa9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwYWNrYWdlZCUyMHNuYWNrc3xlbnwxfHx8fDE3NzU4MzA0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      manufactureDate: new Date('2026-03-20'),
      expiryDate: new Date('2026-06-20'), // 2 months from now
    },
    {
      id: '3',
      name: 'Fresh Dairy Milk',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1768850418251-17480117ac9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBib3R0bGUlMjBwcm9kdWN0fGVufDF8fHx8MTc3NTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      manufactureDate: new Date('2026-04-08'),
      expiryDate: new Date('2026-04-10T23:59:59'), // Expires today (simulating near-expiry)
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Product Showcase
            </h1>
            <p className="text-xl text-gray-600">
              Get quality surplus food and help those in need
            </p>
          </div>

          {/* Add Food Button */}
          <motion.button
            onClick={() => setIsAddFoodModalOpen(true)}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-6 h-6" />
            Add Food
          </motion.button>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Add Food Modal */}
      <AddFoodModal
        isOpen={isAddFoodModalOpen}
        onClose={() => setIsAddFoodModalOpen(false)}
        onSubmit={handleAddFood}
      />
    </div>
  );
}