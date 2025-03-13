
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { UserNav } from './UserNav';
import { LogIn } from 'lucide-react';

export function Header() {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-news-accent">NewsNest</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <nav className="hidden md:flex items-center space-x-4">
                <a href="/dashboard" className="text-sm font-medium hover:text-news-accent">
                  Dashboard
                </a>
                <a href="/preferences" className="text-sm font-medium hover:text-news-accent">
                  Preferences
                </a>
              </nav>
              <UserNav />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
              >
                Log in
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
