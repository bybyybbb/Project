import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  BarChart,
  PieChart,
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, TrendingUp, Users, Eye, Share2, MessageSquare } from "lucide-react";
import { useState } from "react";

// Mock data for demonstration
const engagementData = [
  { date: "Mon", likes: 245, retweets: 132, replies: 65, impressions: 3200 },
  { date: "Tue", likes: 285, retweets: 91, replies: 72, impressions: 2900 },
  { date: "Wed", likes: 312, retweets: 102, replies: 89, impressions: 3450 },
  { date: "Thu", likes: 356, retweets: 187, replies: 95, impressions: 4100 },
  { date: "Fri", likes: 468, retweets: 213, replies: 120, impressions: 5300 },
  { date: "Sat", likes: 520, retweets: 310, replies: 132, impressions: 6200 },
  { date: "Sun", likes: 410, retweets: 175, replies: 94, impressions: 4800 },
];

const contentTypePerformance = [
  { name: "Memes", value: 42, color: "#8884d8" },
  { name: "Educational", value: 28, color: "#82ca9d" },
  { name: "Engagement", value: 18, color: "#ffc658" },
  { name: "CTA", value: 8, color: "#ff8042" },
  { name: "Reply", value: 4, color: "#0088fe" },
];

const weeklyTrends = [
  { week: "Week 1", engagement: 3200, followers: 120 },
  { week: "Week 2", engagement: 3800, followers: 180 },
  { week: "Week 3", engagement: 4100, followers: 210 },
  { week: "Week 4", engagement: 5300, followers: 260 },
  { week: "Week 5", engagement: 4700, followers: 290 },
  { week: "Week 6", engagement: 5900, followers: 340 },
  { week: "Week 7", engagement: 6400, followers: 410 },
  { week: "Week 8", engagement: 7200, followers: 490 },
];

const hashtagPerformance = [
  { name: "#PePumpIt", engagement: 5430, reach: 15200 },
  { name: "#MoonSoon", engagement: 3120, reach: 9800 },
  { name: "#Crypto", engagement: 2350, reach: 7600 },
  { name: "#MemeCoin", engagement: 1780, reach: 6200 },
  { name: "#ToTheMoon", engagement: 1250, reach: 4100 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Track your $PEPUMP Twitter marketing performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Engagement"
            value="14.2K"
            icon={<TrendingUp size={18} />}
            description="↑ 24% from previous period"
          />
          <StatsCard
            title="Followers"
            value="3,456"
            icon={<Users size={18} />}
            description="↑ 8% from previous period"
          />
          <StatsCard
            title="Impressions"
            value="86.5K"
            icon={<Eye size={18} />}
            description="↑ 12% from previous period"
          />
          <StatsCard
            title="Avg. Engagement Rate"
            value="4.2%"
            icon={<Share2 size={18} />}
            description="↑ 0.5% from previous period"
          />
        </div>

        {/* Engagement Overview Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
            <CardDescription>
              Track likes, retweets, replies and impressions over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="likes"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="retweets"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="replies"
                    stroke="#ffc658"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="impressions"
                    stroke="#ff8042"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content Performance</TabsTrigger>
            <TabsTrigger value="growth">Growth Metrics</TabsTrigger>
            <TabsTrigger value="hashtags">Hashtag Analysis</TabsTrigger>
          </TabsList>
          
          {/* Content Performance Tab */}
          <TabsContent value="content" className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Type Performance</CardTitle>
                  <CardDescription>
                    Engagement distribution by content type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={contentTypePerformance}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {contentTypePerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Content</CardTitle>
                  <CardDescription>
                    Tweets with highest engagement rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">
                            🚀 $PEPUMP breaking all resistance levels! Not financial advice but... 
                            {item === 1 ? "#PePumpIt #MemeCoin" : 
                             item === 2 ? "Who's coming with us to the moon? 🌕" :
                             "YOUR BAGS LOOK LIGHT ANON 👀"}
                          </div>
                          <div className="text-sm text-muted-foreground">3d ago</div>
                        </div>
                        <div className="flex gap-4 mt-2 text-sm">
                          <div className="flex items-center">
                            <MessageSquare className="mr-1 h-3 w-3" />
                            {item === 1 ? "142" : item === 2 ? "98" : "76"} Replies
                          </div>
                          <div className="flex items-center">
                            <Share2 className="mr-1 h-3 w-3" />
                            {item === 1 ? "521" : item === 2 ? "347" : "284"} Retweets
                          </div>
                          <div className="flex items-center text-red-500">
                            <span className="mr-1">❤️</span>
                            {item === 1 ? "1.2K" : item === 2 ? "890" : "720"}
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Engagement Rate: 
                          <span className="text-green-600 font-medium ml-1">
                            {item === 1 ? "8.4%" : item === 2 ? "7.1%" : "6.3%"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Content Performance by Time of Day</CardTitle>
                <CardDescription>
                  Optimize your posting schedule based on engagement patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { time: "12am-4am", engagement: 2.1 },
                        { time: "4am-8am", engagement: 1.8 },
                        { time: "8am-12pm", engagement: 3.2 },
                        { time: "12pm-4pm", engagement: 4.5 },
                        { time: "4pm-8pm", engagement: 6.7 },
                        { time: "8pm-12am", engagement: 5.1 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis label={{ value: 'Engagement Rate (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="engagement" fill="#8884d8" name="Avg. Engagement Rate">
                        {[
                          { time: "12am-4am", engagement: 2.1 },
                          { time: "4am-8am", engagement: 1.8 },
                          { time: "8am-12pm", engagement: 3.2 },
                          { time: "12pm-4pm", engagement: 4.5 },
                          { time: "4pm-8pm", engagement: 6.7 },
                          { time: "8pm-12am", engagement: 5.1 },
                        ].map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.engagement > 5 ? "#4caf50" : entry.engagement > 3 ? "#2196f3" : "#ff9800"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Growth Metrics Tab */}
          <TabsContent value="growth" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
                <CardDescription>
                  Track follower growth over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyTrends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="followers"
                        stroke="#8884d8"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>
                    Key demographics of your followers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Gender</h4>
                      <div className="h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Male", value: 65, color: "#3b82f6" },
                                { name: "Female", value: 30, color: "#ec4899" },
                                { name: "Other", value: 5, color: "#84cc16" },
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={60}
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {[
                                { name: "Male", value: 65, color: "#3b82f6" },
                                { name: "Female", value: 30, color: "#ec4899" },
                                { name: "Other", value: 5, color: "#84cc16" },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Age Groups</h4>
                      <div className="h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { age: "18-24", value: 25 },
                              { age: "25-34", value: 40 },
                              { age: "35-44", value: 20 },
                              { age: "45+", value: 15 },
                            ]}
                          >
                            <XAxis dataKey="age" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Bar dataKey="value" fill="#8884d8" name="Percentage">
                              {[
                                { age: "18-24", value: 25 },
                                { age: "25-34", value: 40 },
                                { age: "35-44", value: 20 },
                                { age: "45+", value: 15 },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Engagement to Follower Ratio</CardTitle>
                  <CardDescription>
                    Track how engagement grows with followers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={weeklyTrends}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="engagement"
                          stroke="#82ca9d"
                          strokeWidth={2}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="followers"
                          stroke="#8884d8"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Hashtag Analysis Tab */}
          <TabsContent value="hashtags" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Hashtag Performance</CardTitle>
                <CardDescription>
                  Compare engagement and reach of your hashtags
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={hashtagPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="engagement" fill="#8884d8" name="Engagement" />
                      <Bar yAxisId="right" dataKey="reach" fill="#82ca9d" name="Reach" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trending Hashtags</CardTitle>
                  <CardDescription>
                    Popular hashtags in your niche
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { tag: "#Crypto", volume: 1450000, growth: 8.2 },
                      { tag: "#BSC", volume: 382000, growth: 5.1 },
                      { tag: "#MemeCoin", volume: 256000, growth: 12.3 },
                      { tag: "#ToTheMoon", volume: 189000, growth: 2.8 },
                      { tag: "#PePumpIt", volume: 42000, growth: 24.6 },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border-b last:border-0">
                        <div className="font-medium">{item.tag}</div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {item.volume.toLocaleString()} tweets
                          </span>
                          <span className={`text-xs font-medium ${item.growth > 10 ? 'text-green-600' : 'text-blue-600'}`}>
                            ↑ {item.growth}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Hashtags</CardTitle>
                  <CardDescription>
                    Suggestions to improve your reach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { tag: "#DeFi", relevance: "High", potential: 92 },
                      { tag: "#AltSeason", relevance: "Medium", potential: 86 },
                      { tag: "#CryptoGems", relevance: "High", potential: 89 },
                      { tag: "#100xGem", relevance: "Medium", potential: 81 },
                      { tag: "#BinanceSmartChain", relevance: "High", potential: 90 },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border-b last:border-0">
                        <div>
                          <div className="font-medium">{item.tag}</div>
                          <div className="text-xs text-muted-foreground">Relevance: {item.relevance}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium">
                            {item.potential}% <span className="text-muted-foreground">potential</span>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-2">
                            Use
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}