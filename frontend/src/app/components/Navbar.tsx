import { useState } from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed, MapPin, Search, Menu, X, Home, Info, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router';

interface NavbarProps {
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
}

export function Navbar({ selectedLocation, onLocationChange }: NavbarProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState(selectedLocation || '');

  const popularCities = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
  ];

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationSearch && onLocationChange) {
      onLocationChange(locationSearch);
      setIsSearchOpen(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setLocationSearch(city);
    if (onLocationChange) {
      onLocationChange(city);
    }
    setIsSearchOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <UtensilsCrossed className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FreePlate
              </span>
              <p className="text-xs text-gray-500">Share Meals, Share Hope</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Navigation Links */}
            <motion.button
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </motion.button>

            {/* Location Search */}
            <div className="relative">
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">
                  {selectedLocation || 'Select Location'}
                </span>
              </motion.button>

              {/* Location Dropdown */}
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4"
                >
                  <form onSubmit={handleLocationSubmit} className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Search city or location..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    </div>
                  </form>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Popular Cities</p>
                    {popularCities.map((city) => (
                      <motion.button
                        key={city}
                        onClick={() => handleCitySelect(city)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {city}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Auth Buttons */}
            <motion.button
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
            >
              <LogIn className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Sign Up</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {/* Navigation Links */}
            <div className="space-y-2 mb-4">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => navigate('/')}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => navigate('/about')}
              >
                <Info className="w-5 h-5" />
                <span className="font-medium">About</span>
              </button>
            </div>

            {/* Location Search */}
            <form onSubmit={handleLocationSubmit} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Search city or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>

            <div className="space-y-2 mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">Popular Cities</p>
              {popularCities.slice(0, 4).map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {city}
                  </div>
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="space-y-2">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => navigate('/login')}
              >
                <LogIn className="w-5 h-5" />
                <span className="font-medium">Login</span>
              </button>
              <button
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/signup')}
              >
                <UserPlus className="w-5 h-5" />
                <span className="font-medium">Sign Up</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}