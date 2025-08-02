import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { TweetCard } from "@/components/content/tweet-card";
import { TweetEditor } from "@/components/content/tweet-editor";
import { Tweet } from "@/types";
import { Plus, RefreshCw, Sparkles, Wand } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock data for demonstration
const mockTweets: Tweet[] = [
  {
    id: "1",
    content: "🚀 $PEPUMP is going to the moon! Who's coming with us? 🌕 #PePumpIt #ToTheMoon #Crypto #MemeCoin",
    hashtags: ["PePumpIt", "ToTheMoon", "Crypto", "MemeCoin"],
    images: ["https://placehold.co/600x400/green/white?text=PEPUMP+MOON"],
    status: "approved",
    type: "meme",
    scheduled: true,
    scheduledTime: new Date(Date.now() + 86400000),
    createdAt: new Date(),
  },
  {
    id: "2",
    content: "📈 Understanding $PEPUMP tokenomics: 50% locked liquidity, 30% community rewards, 20% development. Building for the long term! #Tokenomics #PePumpIt",
    hashtags: ["Tokenomics", "PePumpIt"],
    status: "draft",
    type: "educational",
    scheduled: false,
    createdAt: new Date(),
  },
  {
    id: "3",
    content: "🔥 The community has spoken! 95% voted to accelerate our roadmap. Big things coming for $PEPUMP holders this month! #CommunityFirst #PePumpIt",
    hashtags: ["CommunityFirst", "PePumpIt"],
    status: "draft",
    type: "engagement",
    scheduled: false,
    createdAt: new Date(),
  },
];

export default function ContentGenerator() {
  const [tweets, setTweets] = useState<Tweet[]>(mockTweets);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState<Tweet | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState<Tweet["type"]>("meme");
  const [prompt, setPrompt] = useState("");

  // Handle tweet creation/update
  const handleSaveTweet = (tweetData: Omit<Tweet, "id" | "createdAt" | "engagement">) => {
    if (selectedTweet) {
      // Update existing tweet
      setTweets((prev) =>
        prev.map((t) =>
          t.id === selectedTweet.id
            ? { ...t, ...tweetData, status: "draft" }
            : t
        )
      );
    } else {
      // Create new tweet
      const newTweet: Tweet = {
        id: `tweet-${Date.now()}`,
        createdAt: new Date(),
        ...tweetData,
      };
      setTweets((prev) => [...prev, newTweet]);
    }
  };

  // Handle tweet actions
  const handleApprove = (id: string) => {
    setTweets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "approved" } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTweets((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (tweet: Tweet) => {
    setSelectedTweet(tweet);
    setIsEditorOpen(true);
  };

  // AI Content Generation
  const handleGenerateContent = () => {
    setIsGenerating(true);
    
    // Simulating AI content generation
    setTimeout(() => {
      const newContent: Partial<Tweet> = {
        id: `tweet-${Date.now()}`,
        createdAt: new Date(),
        status: "draft",
        type: contentType,
      };
      
      // Generate content based on type
      switch (contentType) {
        case "meme":
          newContent.content = "🚀🚀 JUST IN: $PEPUMP breaking all resistance levels! Not financial advice but... YOUR BAGS LOOK LIGHT ANON 👀 #PePumpIt #MemeMoney";
          newContent.hashtags = ["PePumpIt", "MemeMoney", "Crypto", "BSC"];
          newContent.images = ["https://placehold.co/600x400/22aa22/white?text=BULLISH+AF"];
          break;
        case "educational":
          newContent.content = "Did you know? $PEPUMP uses an innovative liquidity locking mechanism that increases token scarcity over time. This creates a deflationary effect while maintaining stability. #PePumpIt #Tokenomics #CryptoEducation";
          newContent.hashtags = ["PePumpIt", "Tokenomics", "CryptoEducation"];
          break;
        case "engagement":
          newContent.content = "Poll time $PEPUMP fam! What feature should we prioritize next? Vote below! 👇\n\n1️⃣ Staking rewards\n2️⃣ NFT integration\n3️⃣ Mobile app\n4️⃣ DEX listing";
          newContent.hashtags = ["PePumpIt", "CryptoVote", "Community"];
          break;
        case "cta":
          newContent.content = "The $PEPUMP presale is LIVE! 🔥 Early adopters get 25% bonus tokens. Don't miss your chance - only 24 hours left! Link in bio. #PePumpIt #Presale #LastChance";
          newContent.hashtags = ["PePumpIt", "Presale", "LastChance", "BSC"];
          break;
        case "reply":
          newContent.content = "Great question! $PEPUMP's tokenomics are designed for long-term sustainability. The 2% reflection rewards early holders while our liquidity lock ensures price stability. #PePumpIt #DYOR";
          newContent.hashtags = ["PePumpIt", "DYOR"];
          break;
      }
      
      // Add the generated tweet
      setTweets((prev) => [...prev, newContent as Tweet]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Content Generator</h1>
            <p className="text-muted-foreground">
              Create and manage content for your $PEPUMP Twitter campaign
            </p>
          </div>
          <Button onClick={() => {
            setSelectedTweet(undefined);
            setIsEditorOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" /> Create Manual Content
          </Button>
        </div>

        {/* AI Content Generator */}
        <Card>
          <CardHeader>
            <CardTitle>AI Content Generator</CardTitle>
            <CardDescription>
              Let AI create engaging content for your $PEPUMP marketing campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Content Type</label>
                <Select 
                  value={contentType} 
                  onValueChange={(value) => setContentType(value as Tweet["type"])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Content Types</SelectLabel>
                      <SelectItem value="meme">Viral Meme</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="cta">Call to Action</SelectItem>
                      <SelectItem value="reply">Smart Reply</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Key Message</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select key message" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moon">Moon Soon</SelectItem>
                    <SelectItem value="community">Community Focus</SelectItem>
                    <SelectItem value="utility">Utility & Use-case</SelectItem>
                    <SelectItem value="fomo">FOMO Generation</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Custom Prompt (optional)</label>
              <Textarea 
                placeholder="E.g., Create a funny meme tweet about $PEPUMP breaking all-time highs"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Include Hashtags</label>
                <Input placeholder="#PePumpIt, #BSC, #Crypto" />
              </div>

              <div>
                <label className="text-sm font-medium">Tone of Voice</label>
                <Select defaultValue="hype">
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hype">Hype & Excitement</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="funny">Humorous</SelectItem>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="fomo">FOMO-inducing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleGenerateContent}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Content with AI
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Generated Content */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated Content</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Wand className="mr-1 h-3 w-3" /> Batch Generate
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tweets.map((tweet) => (
              <TweetCard
                key={tweet.id}
                tweet={tweet}
                onApprove={handleApprove}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tweet Editor Dialog */}
      <TweetEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setSelectedTweet(undefined);
        }}
        onSave={handleSaveTweet}
        initialTweet={selectedTweet}
      />
    </AppLayout>
  );
}