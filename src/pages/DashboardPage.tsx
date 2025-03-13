
import { useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ArticleList } from '@/components/news/ArticleList';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const DashboardPage = () => {
  const { isAuthenticated, preferences } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <PageLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your News Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Stay informed with news tailored to your interests
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={() => navigate('/preferences')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Edit Preferences
          </Button>
        </div>

        {preferences && preferences.topics.length > 0 ? (
          <div className="mb-8">
            <div className="bg-muted p-4 rounded-lg">
              <h2 className="font-medium mb-2">Your Interests</h2>
              <div className="flex flex-wrap gap-2">
                {preferences.topics.map(topic => (
                  <span key={topic} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                    {topic}
                  </span>
                ))}
                {preferences.keywords.map(keyword => (
                  <span key={keyword} className="bg-news-accent/10 text-news-accent px-2 py-1 rounded-md text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <ArticleList />
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
