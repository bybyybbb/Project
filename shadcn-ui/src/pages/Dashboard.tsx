import { AppLayout } from "@/components/layout/app-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TweetCard } from "@/components/content/tweet-card";
import { BarChart2, Calendar, MessageSquareText, PenTool, Plus, TrendingUp, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tweet } from "@/types";

// Mock data for demonstration
const recentTweets: Tweet[] = [
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
];

export default function Dashboard() {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              $PEPUMP Twitter marketing campaign overview
            </p>
          </div>
          <Button onClick={() => navigate("/content-generator")}>
            <Plus className="mr-2 h-4 w-4" /> Create Content
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Generated Content"
            value="32"
            icon={<PenTool size={18} />}
            description="Last 7 days"
          />
          <StatsCard
            title="Scheduled Tweets"
            value="14"
            icon={<Calendar size={18} />}
            description="Next 24 hours: 3"
          />
          <StatsCard
            title="Engagement Rate"
            value="3.2%"
            icon={<MessageSquareText size={18} />}
            description="↑ 0.8% from last week"
          />
          <StatsCard
            title="Trending Tags"
            value="2"
            icon={<TrendingUp size={18} />}
            description="#PePumpIt, #MoonSoon"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Tweets */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                Recent Content
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate("/content-generator")}>
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTweets.map((tweet) => (
                <div key={tweet.id} className="border rounded-md p-4">
                  <TweetCard tweet={tweet} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                Performance Metrics
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate("/analytics")}>
                Detailed Analytics
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Placeholder for charts */}
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <BarChart2 size={40} className="text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Engagement analytics will appear here</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Total Impressions</p>
                    <p className="text-2xl font-bold">24.5K</p>
                    <p className="text-xs text-muted-foreground">↑ 12% from last week</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Profile Visits</p>
                    <p className="text-2xl font-bold">1.2K</p>
                    <p className="text-xs text-muted-foreground">↑ 18% from last week</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connected Accounts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Connected Accounts
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/accounts")}>
              Manage Accounts
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-3">
                <Twitter className="text-blue-500" />
                <div>
                  <p className="font-medium">@PePumpOfficial</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}