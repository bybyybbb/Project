export interface Tweet {
  id: string;
  content: string;
  hashtags: string[];
  images?: string[];
  scheduled: boolean;
  scheduledTime?: Date;
  status: 'draft' | 'approved' | 'published' | 'failed';
  type: 'meme' | 'educational' | 'engagement' | 'reply' | 'cta';
  engagement?: {
    likes: number;
    retweets: number;
    replies: number;
  };
  createdAt: Date;
}

export interface MarketingStrategy {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  targetAudience: string[];
  toneOfVoice: string[];
  keyMessages: string[];
  hashtagsToUse: string[];
  postingFrequency: {
    memes: number;
    educational: number;
    engagement: number;
    cta: number;
  };
  createdAt: Date;
}

export interface TrendingTopic {
  id: string;
  name: string;
  volume: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  relevanceScore: number;
  relatedHashtags: string[];
}

export interface TwitterAccount {
  id: string;
  username: string;
  apiKey?: string;
  apiKeySecret?: string;
  accessToken?: string;
  accessTokenSecret?: string;
  connected: boolean;
}

export interface GenerationPrompt {
  id: string;
  name: string;
  prompt: string;
  type: 'tweet' | 'thread' | 'reply' | 'meme';
  parameters: Record<string, string>;
}

export interface ScheduledPost {
  id: string;
  tweetId: string;
  scheduledTime: Date;
  status: 'pending' | 'published' | 'failed';
  tweet: Tweet;
}