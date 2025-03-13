
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProcessedArticle, UserPreferences, User } from '@/types';
import { mockArticles, userPreferences } from '@/services/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  articles: ProcessedArticle[];
  preferences: UserPreferences | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  markArticleAsRead: (articleId: string) => void;
  toggleSaveArticle: (articleId: string) => void;
  getFilteredArticles: (filter?: 'all' | 'unread' | 'saved') => ProcessedArticle[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<ProcessedArticle[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Simulate fetching user and data on app load
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Check for stored auth in localStorage (simulating token-based auth)
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setPreferences(userPreferences); // In real app, would fetch based on user ID
      }
      
      setArticles(mockArticles);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login (in real app, would validate with Nhost)
      if (email && password) {
        const loggedInUser: User = {
          id: 'user123',
          email,
          displayName: email.split('@')[0],
          createdAt: new Date().toISOString(),
        };
        
        setUser(loggedInUser);
        setPreferences(userPreferences);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup (in real app, would create user with Nhost)
      if (email && password && name) {
        const newUser: User = {
          id: 'user' + Date.now(),
          email,
          displayName: name,
          createdAt: new Date().toISOString(),
        };
        
        setUser(newUser);
        // Create default preferences for new user
        const newPreferences: UserPreferences = {
          userId: newUser.id,
          topics: ['technology', 'world'],
          keywords: [],
          preferredSources: ['bbc-news', 'reuters'],
        };
        setPreferences(newPreferences);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        toast({
          title: "Account created",
          description: "Welcome to NewsNest!",
        });
      } else {
        throw new Error('Please fill in all required fields');
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An error occurred during signup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setPreferences(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    if (!preferences) return;
    
    const updatedPreferences = {
      ...preferences,
      ...newPreferences,
    };
    
    setPreferences(updatedPreferences);
    toast({
      title: "Preferences updated",
      description: "Your news preferences have been saved",
    });
    
    // In real app, would sync with Nhost
  };

  const markArticleAsRead = (articleId: string) => {
    setArticles(prevArticles => 
      prevArticles.map(article => 
        article.id === articleId 
          ? { ...article, isRead: true } 
          : article
      )
    );
    // In real app, would sync with Nhost
  };

  const toggleSaveArticle = (articleId: string) => {
    setArticles(prevArticles => 
      prevArticles.map(article => 
        article.id === articleId 
          ? { ...article, isSaved: !article.isSaved } 
          : article
      )
    );
    // In real app, would sync with Nhost
  };

  const getFilteredArticles = (filter: 'all' | 'unread' | 'saved' = 'all') => {
    switch (filter) {
      case 'unread':
        return articles.filter(article => !article.isRead);
      case 'saved':
        return articles.filter(article => article.isSaved);
      case 'all':
      default:
        return articles;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    articles,
    preferences,
    isLoading,
    login,
    logout,
    signup,
    updatePreferences,
    markArticleAsRead,
    toggleSaveArticle,
    getFilteredArticles,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
