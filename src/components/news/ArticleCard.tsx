
import { useState } from 'react';
import { ProcessedArticle } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Share2, ExternalLink, Check } from 'lucide-react';

interface ArticleCardProps {
  article: ProcessedArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { markArticleAsRead, toggleSaveArticle } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-sentiment-positive text-white';
      case 'negative':
        return 'bg-sentiment-negative text-white';
      case 'neutral':
      default:
        return 'bg-sentiment-neutral text-black';
    }
  };

  const handleReadClick = () => {
    markArticleAsRead(article.id);
    window.open(article.url, '_blank');
  };

  const handleSaveToggle = () => {
    toggleSaveArticle(article.id);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: article.url,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(article.url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Card className={`w-full transition-all duration-200 ${article.isRead ? 'opacity-75' : ''}`}>
      <div className="flex flex-col md:flex-row">
        {article.imageUrl && (
          <div className="md:w-1/3">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
        )}
        <div className={article.imageUrl ? 'md:w-2/3' : 'w-full'}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline" className="text-xs">
                {article.source}
              </Badge>
              <Badge className={`text-xs ${getSentimentColor(article.sentiment)}`}>
                {article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
              </Badge>
            </div>
            <CardTitle className="line-clamp-2 text-lg font-bold">
              {article.title}
            </CardTitle>
            <CardDescription className="text-xs">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            <p className={`text-sm mb-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
              {article.summary}
            </p>
            {article.summary.length > 150 && (
              <Button 
                variant="link" 
                className="p-0 h-auto text-xs text-news-accent"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </Button>
            )}
            
            <div className="flex flex-wrap gap-1 mt-2">
              {article.topics.map(topic => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-2">
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                className={article.isSaved ? 'text-sentiment-positive' : ''}
                onClick={handleSaveToggle}
              >
                <Heart className={`h-4 w-4 mr-1 ${article.isSaved ? 'fill-sentiment-positive' : ''}`} />
                {article.isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button size="sm" variant="outline" onClick={handleShareClick}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            <Button size="sm" onClick={handleReadClick}>
              {article.isRead ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Read
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Read Full
                </>
              )}
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
