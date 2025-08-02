import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TrendingUp, RefreshCw, Plus, Globe, Twitter, ArrowUpRight, Clock, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TrendingTopic } from "@/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for demonstration
const mockTrendingTopics: TrendingTopic[] = [
  {
    id: "1",
    name: "#Crypto",
    volume: 452000,
    relevanceScore: 92,
    sentimentScore: 68,
    category: "general",
    status: "active",
    change: "+15%",
    trackingEnabled: true,
  },
  {
    id: "2",
    name: "#BSCGems",
    volume: 87500,
    relevanceScore: 95,
    sentimentScore: 72,
    category: "crypto",
    status: "active",
    change: "+24%",
    trackingEnabled: true,
  },
  {
    id: "3",
    name: "#BTC",
    volume: 320000,
    relevanceScore: 70,
    sentimentScore: 65,
    category: "crypto",
    status: "active",
    change: "+8%",
    trackingEnabled: true,
  },
  {
    id: "4",
    name: "#ToTheMoon",
    volume: 156000,
    relevanceScore: 85,
    sentimentScore: 78,
    category: "crypto",
    status: "active",
    change: "+32%",
    trackingEnabled: true,
  },
  {
    id: "5",
    name: "#AltSeason",
    volume: 96400,
    relevanceScore: 88,
    sentimentScore: 75,
    category: "crypto",
    status: "active",
    change: "+18%",
    trackingEnabled: true,
  },
  {
    id: "6",
    name: "#PePumpIt",
    volume: 42500,
    relevanceScore: 100,
    sentimentScore: 82,
    category: "brand",
    status: "active",
    change: "+65%",
    trackingEnabled: true,
  },
  {
    id: "7",
    name: "#MoonSoon",
    volume: 28600,
    relevanceScore: 90,
    sentimentScore: 80,
    category: "brand",
    status: "active",
    change: "+41%",
    trackingEnabled: true,
  },
];

export default function TrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>(mockTrendingTopics);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || topic.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh trending topics
    setTimeout(() => {
      setIsRefreshing(false);
      // In a real app, we would update with new data from the API
    }, 1500);
  };
  
  const handleToggleTracking = (id: string) => {
    setTopics(prev => 
      prev.map(topic => 
        topic.id === id ? { ...topic, trackingEnabled: !topic.trackingEnabled } : topic
      )
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Trending Topics</h1>
            <p className="text-muted-foreground">
              Track and monitor trending topics relevant to $PEPUMP
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                </>
              )}
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Track New Topic
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all">All Topics</TabsTrigger>
              <TabsTrigger value="tracked">Tracked</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="brand">Brand</TabsTrigger>
            </TabsList>
            
            <div className="flex w-full md:w-auto items-center gap-2">
              <Input
                placeholder="Search topics..."
                className="w-full md:w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="brand">Brand</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">Global Trending Topics</CardTitle>
                  <CardDescription>
                    Topics trending worldwide relevant to $PEPUMP
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-t">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left text-sm font-medium">Topic</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Volume</th>
                          <th className="py-3 px-4 text-left text-sm font-medium hidden md:table-cell">Change</th>
                          <th className="py-3 px-4 text-left text-sm font-medium hidden md:table-cell">Relevance</th>
                          <th className="py-3 px-4 text-left text-sm font-medium hidden md:table-cell">Sentiment</th>
                          <th className="py-3 px-4 text-right text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTopics.map((topic) => (
                          <tr key={topic.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Twitter className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{topic.name}</span>
                                <Badge variant="outline" className="capitalize">
                                  {topic.category}
                                </Badge>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {topic.volume.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-sm hidden md:table-cell">
                              <span className="text-green-600 font-medium">
                                {topic.change}
                              </span>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <div className="bg-gray-200 h-2 w-24 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-primary h-full rounded-full"
                                    style={{ width: `${topic.relevanceScore}%` }}
                                  />
                                </div>
                                <span className="text-sm">{topic.relevanceScore}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <div className="bg-gray-200 h-2 w-24 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      topic.sentimentScore > 70 
                                        ? "bg-green-500" 
                                        : topic.sentimentScore > 50
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                    }`}
                                    style={{ width: `${topic.sentimentScore}%` }}
                                  />
                                </div>
                                <span className="text-sm">{topic.sentimentScore}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <ArrowUpRight className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant={topic.trackingEnabled ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleToggleTracking(topic.id)}
                                >
                                  {topic.trackingEnabled ? "Tracking" : "Track"}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tracked">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">Tracked Topics</CardTitle>
                  <CardDescription>
                    Topics you are currently monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-t">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left text-sm font-medium">Topic</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Volume</th>
                          <th className="py-3 px-4 text-left text-sm font-medium hidden md:table-cell">Change</th>
                          <th className="py-3 px-4 text-left text-sm font-medium hidden md:table-cell">Relevance</th>
                          <th className="py-3 px-4 text-right text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTopics.filter(topic => topic.trackingEnabled).map((topic) => (
                          <tr key={topic.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Twitter className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{topic.name}</span>
                                <Badge variant="outline" className="capitalize">
                                  {topic.category}
                                </Badge>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {topic.volume.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-sm hidden md:table-cell">
                              <span className="text-green-600 font-medium">
                                {topic.change}
                              </span>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <div className="bg-gray-200 h-2 w-24 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-primary h-full rounded-full"
                                    style={{ width: `${topic.relevanceScore}%` }}
                                  />
                                </div>
                                <span className="text-sm">{topic.relevanceScore}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <ArrowUpRight className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleToggleTracking(topic.id)}
                                >
                                  Tracking
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="crypto">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">Crypto Topics</CardTitle>
                  <CardDescription>
                    Trending topics in the crypto space
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-t">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left text-sm font-medium">Topic</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Volume</th>
                          <th className="py-3 px-4 text-left text-sm font-medium hidden md:table-cell">Change</th>
                          <th className="py-3 px-4 text-left text-sm font-medium hidden md:table-cell">Relevance</th>
                          <th className="py-3 px-4 text-right text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTopics.filter(topic => topic.category === 'crypto').map((topic) => (
                          <tr key={topic.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Twitter className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{topic.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {topic.volume.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-sm hidden md:table-cell">
                              <span className="text-green-600 font-medium">
                                {topic.change}
                              </span>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <div className="bg-gray-200 h-2 w-24 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-primary h-full rounded-full"
                                    style={{ width: `${topic.relevanceScore}%` }}
                                  />
                                </div>
                                <span className="text-sm">{topic.relevanceScore}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <ArrowUpRight className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant={topic.trackingEnabled ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleToggleTracking(topic.id)}
                                >
                                  {topic.trackingEnabled ? "Tracking" : "Track"}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="brand">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">Brand Topics</CardTitle>
                  <CardDescription>
                    Topics specific to $PEPUMP brand
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-t">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left text-sm font-medium">Topic</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Volume</th>
                          <th className="py-3 px-4 text-left text-sm font-medium hidden md:table-cell">Change</th>
                          <th className="py-3 px-4 text-left text-sm font-medium hidden md:table-cell">Relevance</th>
                          <th className="py-3 px-4 text-right text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTopics.filter(topic => topic.category === 'brand').map((topic) => (
                          <tr key={topic.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Twitter className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{topic.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {topic.volume.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-sm hidden md:table-cell">
                              <span className="text-green-600 font-medium">
                                {topic.change}
                              </span>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <div className="bg-gray-200 h-2 w-24 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-primary h-full rounded-full"
                                    style={{ width: `${topic.relevanceScore}%` }}
                                  />
                                </div>
                                <span className="text-sm">{topic.relevanceScore}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <ArrowUpRight className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant={topic.trackingEnabled ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleToggleTracking(topic.id)}
                                >
                                  {topic.trackingEnabled ? "Tracking" : "Track"}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Topic Insights</CardTitle>
              <CardDescription>
                Understanding what's driving the trends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">#PePumpIt</h3>
                <p className="text-sm text-muted-foreground">
                  Showing 65% growth in the last 24 hours. The trend is being driven by recent
                  announcements about the project's roadmap and community engagement activities.
                  Sentiment is overwhelmingly positive (82%).
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">#BSCGems</h3>
                <p className="text-sm text-muted-foreground">
                  The hashtag has consistent engagement with crypto investors looking for new projects.
                  $PEPUMP appears in 18% of tweets with this hashtag, suggesting good visibility within
                  this community.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">#MoonSoon</h3>
                <p className="text-sm text-muted-foreground">
                  This brand hashtag is gaining traction with 41% growth. It's frequently paired with
                  $PEPUMP mentions and appears to resonate well with the target audience.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Actions</CardTitle>
              <CardDescription>
                Optimize your content based on trending topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border p-3 rounded-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Create content around #BSCGems</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        High relevance and engagement for your audience
                      </p>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
                
                <div className="border p-3 rounded-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Increase #MoonSoon usage</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Growing brand hashtag with positive sentiment
                      </p>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
                
                <div className="border p-3 rounded-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Add #AltSeason to relevant tweets</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Growing trend with high relevance to $PEPUMP
                      </p>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Generate More Suggestions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}