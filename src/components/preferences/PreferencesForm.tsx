
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { availableTopics, availableSources } from '@/services/mockData';
import { UserPreferences } from '@/types';
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PreferencesForm() {
  const { preferences, updatePreferences, isAuthenticated } = useApp();
  const navigate = useNavigate();
  
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (preferences) {
      setSelectedTopics(preferences.topics || []);
      setSelectedSources(preferences.preferredSources || []);
      setKeywords(preferences.keywords || []);
    }
  }, [preferences]);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleTopicChange = (topic: string, checked: boolean) => {
    setSelectedTopics(prev => 
      checked 
        ? [...prev, topic] 
        : prev.filter(t => t !== topic)
    );
  };

  const handleSourceChange = (source: string, checked: boolean) => {
    setSelectedSources(prev => 
      checked 
        ? [...prev, source] 
        : prev.filter(s => s !== source)
    );
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords(prev => [...prev, currentKeyword.trim()]);
      setCurrentKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create updated preferences object
    const updatedPreferences: Partial<UserPreferences> = {
      topics: selectedTopics,
      preferredSources: selectedSources,
      keywords: keywords,
    };
    
    // Update preferences
    updatePreferences(updatedPreferences);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl">News Preferences</CardTitle>
        <CardDescription>Customize your news feed to see content that matters to you</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Topics</h3>
            <p className="text-sm text-muted-foreground">Select topics you're interested in</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableTopics.map((topic) => (
                <div key={topic.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`topic-${topic.value}`} 
                    checked={selectedTopics.includes(topic.value)}
                    onCheckedChange={(checked) => 
                      handleTopicChange(topic.value, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`topic-${topic.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {topic.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">News Sources</h3>
            <p className="text-sm text-muted-foreground">Select your preferred news sources</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableSources.map((source) => (
                <div key={source.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`source-${source.value}`} 
                    checked={selectedSources.includes(source.value)}
                    onCheckedChange={(checked) => 
                      handleSourceChange(source.value, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`source-${source.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {source.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Keywords</h3>
            <p className="text-sm text-muted-foreground">Add specific keywords to enhance your news feed</p>
            
            <div className="flex space-x-2">
              <Input
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                placeholder="Add a keyword (e.g., climate change)"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleAddKeyword}
                disabled={!currentKeyword.trim()}
              >
                Add
              </Button>
            </div>
            
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword) => (
                  <div 
                    key={keyword}
                    className="flex items-center bg-secondary px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2">Saving preferences</span>
                <span className="animate-pulse-subtle">...</span>
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Preferences
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
