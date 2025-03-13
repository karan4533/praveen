
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import HomePage from './HomePage';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const [showOriginalDesign, setShowOriginalDesign] = useState(true);

  if (!showOriginalDesign) {
    navigate('/alternate');
    return null;
  }

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          onClick={() => setShowOriginalDesign(false)}
          className="bg-background/80 backdrop-blur-sm"
        >
          Try Alternative Design
        </Button>
      </div>
      <HomePage />
    </div>
  );
};

export default Index;
