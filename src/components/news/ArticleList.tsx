
import { useState } from 'react';
import { ProcessedArticle } from '@/types';
import { ArticleCard } from './ArticleCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';

interface ArticleListProps {
  title?: string;
}

export function ArticleList({ title = "Your News Feed" }: ArticleListProps) {
  const { getFilteredArticles } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'saved'>('all');

  const articles = getFilteredArticles(activeTab);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mt-2 md:mt-0">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {articles.length > 0 ? (
        <div className="space-y-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No articles found for this filter.</p>
        </div>
      )}
    </div>
  );
}
