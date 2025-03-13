
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  createdAt: string;
}

export interface UserPreferences {
  userId: string;
  topics: string[];
  keywords: string[];
  preferredSources: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
  topics: string[];
  isRead: boolean;
  isSaved: boolean;
}

export interface ProcessedArticle extends Article {
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  explanation?: string;
}

export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface TopicOption {
  value: string;
  label: string;
}

export interface SourceOption {
  value: string;
  label: string;
  imageUrl?: string;
}
