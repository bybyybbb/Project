import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TweetCard } from "@/components/content/tweet-card";
import { Tweet, ScheduledPost } from "@/types";
import { PlusCircle, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { format, parseISO, isSameDay } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    scheduledTime: new Date(Date.now() + 86400000), // tomorrow
    createdAt: new Date(),
  },
  {
    id: "2",
    content: "📈 Understanding $PEPUMP tokenomics: 50% locked liquidity, 30% community rewards, 20% development. Building for the long term! #Tokenomics #PePumpIt",
    hashtags: ["Tokenomics", "PePumpIt"],
    status: "approved",
    type: "educational",
    scheduled: true,
    scheduledTime: new Date(Date.now() + 86400000 * 3), // 3 days from now
    createdAt: new Date(),
  },
  {
    id: "3",
    content: "🔥 The community has spoken! 95% voted to accelerate our roadmap. Big things coming for $PEPUMP holders this month! #CommunityFirst #PePumpIt",
    hashtags: ["CommunityFirst", "PePumpIt"],
    status: "approved",
    type: "engagement",
    scheduled: true,
    scheduledTime: new Date(Date.now() + 86400000 * 2), // 2 days from now
    createdAt: new Date(),
  },
];

// Convert tweets to scheduled posts
const mockScheduledPosts: ScheduledPost[] = mockTweets.map(tweet => ({
  id: `schedule-${tweet.id}`,
  tweetId: tweet.id,
  scheduledTime: tweet.scheduledTime as Date,
  status: Math.random() > 0.8 ? "failed" : "pending",
  tweet: tweet
}));

export default function Scheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(mockScheduledPosts);
  const [timeSlot, setTimeSlot] = useState<string>("all");
  
  // Filter posts for the selected date
  const filteredPosts = scheduledPosts.filter(post => {
    if (!date) return false;
    
    const postDate = post.scheduledTime;
    const isOnSelectedDay = isSameDay(postDate, date);
    
    if (timeSlot === "all") return isOnSelectedDay;
    
    const hour = postDate.getHours();
    if (timeSlot === "morning") return isOnSelectedDay && hour >= 6 && hour < 12;
    if (timeSlot === "afternoon") return isOnSelectedDay && hour >= 12 && hour < 18;
    if (timeSlot === "evening") return isOnSelectedDay && hour >= 18 && hour < 24;
    if (timeSlot === "night") return isOnSelectedDay && (hour < 6 || hour >= 22);
    
    return isOnSelectedDay;
  });
  
  // Count posts for calendar highlighting
  const getPostCountForDate = (date: Date) => {
    return scheduledPosts.filter(post => isSameDay(post.scheduledTime, date)).length;
  };
  
  // Get highlight class based on count
  const getHighlightClass = (count: number) => {
    if (count === 0) return "";
    if (count <= 2) return "bg-blue-100 rounded-full text-blue-800 font-medium";
    if (count <= 4) return "bg-green-100 rounded-full text-green-800 font-medium";
    return "bg-amber-100 rounded-full text-amber-800 font-medium";
  };

  // Handle rescheduling a post
  const handleReschedule = (post: ScheduledPost) => {
    // In a real app, we would open a dialog to reschedule
    console.log("Reschedule post:", post);
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Content Scheduler</h1>
            <p className="text-muted-foreground">
              Plan and schedule your $PEPUMP Twitter content
            </p>
          </div>
          <Button onClick={() => { /* Navigate to content generator */ }}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Content
          </Button>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Calendar */}
          <Card className="md:col-span-5 lg:col-span-4">
            <CardHeader>
              <CardTitle>Publishing Calendar</CardTitle>
              <CardDescription>
                Select a date to view scheduled content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  highlighted: (date) => getPostCountForDate(date) > 0,
                }}
                modifiersClassNames={{
                  highlighted: (date) => getHighlightClass(getPostCountForDate(date)),
                }}
              />
              
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-blue-100"></div>
                  <span>1-2 posts scheduled</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-green-100"></div>
                  <span>3-4 posts scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-100"></div>
                  <span>5+ posts scheduled</span>
                </div>
              </div>
              
              <div className="border-t mt-4 pt-4">
                <h3 className="font-medium mb-2">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-muted rounded-md">
                    <div className="text-sm text-muted-foreground">Today</div>
                    <div className="text-lg font-bold">{getPostCountForDate(new Date())}</div>
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    <div className="text-sm text-muted-foreground">This Week</div>
                    <div className="text-lg font-bold">14</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Posts */}
          <div className="md:col-span-7 lg:col-span-8 space-y-5">
            {/* Time filters */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({filteredPosts.length} posts)
                </span>
              </div>
              
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All times</SelectItem>
                    <SelectItem value="morning">Morning (6AM-12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM-6PM)</SelectItem>
                    <SelectItem value="evening">Evening (6PM-10PM)</SelectItem>
                    <SelectItem value="night">Night (10PM-6AM)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className={`h-1 ${
                      post.status === "pending" 
                        ? "bg-blue-500" 
                        : post.status === "published" 
                          ? "bg-green-500" 
                          : "bg-red-500"
                    }`} />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          {post.status === "pending" ? (
                            <div className="flex items-center text-blue-600">
                              <RotateCcw size={16} className="mr-1" />
                              <span className="text-sm font-medium">Scheduled</span>
                            </div>
                          ) : post.status === "published" ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle2 size={16} className="mr-1" />
                              <span className="text-sm font-medium">Published</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <AlertCircle size={16} className="mr-1" />
                              <span className="text-sm font-medium">Failed</span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm font-medium">
                          {format(post.scheduledTime, "h:mm a")}
                        </div>
                      </div>
                      
                      <TweetCard
                        tweet={post.tweet}
                        onEdit={post.status === "pending" ? () => {} : undefined}
                      />
                      
                      <div className="flex justify-end mt-3 gap-2">
                        {post.status === "pending" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReschedule(post)}
                            >
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </>
                        )}
                        
                        {post.status === "failed" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReschedule(post)}
                          >
                            Try Again
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : date ? (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Calendar size={40} strokeWidth={1} />
                  <h3 className="mt-4 text-lg font-medium">No content scheduled</h3>
                  <p className="mt-1">
                    No tweets are scheduled for {format(date, "MMMM d, yyyy")}
                  </p>
                  <Button className="mt-4" onClick={() => { /* Navigate to content generator */ }}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Schedule Content
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Calendar size={40} strokeWidth={1} />
                  <h3 className="mt-4 text-lg font-medium">Select a date</h3>
                  <p className="mt-1">
                    Choose a date from the calendar to view scheduled content
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}