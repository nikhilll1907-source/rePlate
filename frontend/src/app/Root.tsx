import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navbar } from './components/Navbar';
import { toast } from 'sonner';

export function Root() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const location = useLocation();

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    toast.success(`Delivery location set to ${location}`);
  };

  // Hide navbar on login and signup pages
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && (
        <Navbar
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
        />
      )}
      <Outlet />
    </>
  );
}
