import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tweet } from "@/types";
import { useState, useEffect } from "react";
import { ImageIcon, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface TweetEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tweet: Omit<Tweet, "id" | "createdAt" | "engagement">) => void;
  initialTweet?: Tweet;
}

export function TweetEditor({
  isOpen,
  onClose,
  onSave,
  initialTweet,
}: TweetEditorProps) {
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [tweetType, setTweetType] = useState<Tweet["type"]>("meme");
  const [images, setImages] = useState<string[]>([]);
  const [scheduled, setScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<string>("");

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isOpen && initialTweet) {
      setContent(initialTweet.content);
      setHashtags(initialTweet.hashtags);
      setTweetType(initialTweet.type);
      setImages(initialTweet.images || []);
      setScheduled(initialTweet.scheduled);
      setScheduledTime(
        initialTweet.scheduledTime
          ? new Date(initialTweet.scheduledTime).toISOString().slice(0, 16)
          : ""
      );
    } else if (isOpen) {
      // Reset form for new tweet
      setContent("");
      setHashtags([]);
      setHashtagInput("");
      setTweetType("meme");
      setImages([]);
      setScheduled(false);
      setScheduledTime("");
    }
  }, [isOpen, initialTweet]);

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput("");
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleAddImage = (url: string) => {
    if (url.trim() && !images.includes(url.trim())) {
      setImages([...images, url.trim()]);
    }
  };

  const handleRemoveImage = (url: string) => {
    setImages(images.filter((img) => img !== url));
  };

  const handleSubmit = () => {
    onSave({
      content,
      hashtags,
      images: images.length > 0 ? images : undefined,
      type: tweetType,
      status: "draft",
      scheduled,
      scheduledTime: scheduled && scheduledTime ? new Date(scheduledTime) : undefined,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialTweet ? "Edit Tweet" : "Create New Tweet"}
          </DialogTitle>
          <DialogDescription>
            Create engaging content for your $PEPUMP marketing campaign
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <div>
                <Label htmlFor="tweet-type">Tweet Type</Label>
                <Select 
                  value={tweetType} 
                  onValueChange={(value) => setTweetType(value as Tweet["type"])}
                >
                  <SelectTrigger id="tweet-type">
                    <SelectValue placeholder="Select tweet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meme">Meme</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="reply">Reply</SelectItem>
                    <SelectItem value="cta">Call to Action</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="content">Tweet Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your tweet content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px]"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {280 - content.length} characters remaining
                </div>
              </div>
              
              <div>
                <Label htmlFor="hashtags">Hashtags</Label>
                <div className="flex gap-2">
                  <Input
                    id="hashtags"
                    placeholder="Enter hashtag (without #)"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddHashtag()}
                  />
                  <Button type="button" onClick={handleAddHashtag}>
                    Add
                  </Button>
                </div>
                
                {hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {hashtags.map((tag, i) => (
                      <div
                        key={i}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm flex items-center gap-1"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveHashtag(tag)}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="space-y-4">
              <div>
                <Label htmlFor="image-url">Add Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image-url"
                    placeholder="Enter image URL"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddImage((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      const input = document.getElementById("image-url") as HTMLInputElement;
                      handleAddImage(input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              {images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-md overflow-hidden aspect-video"
                    >
                      <img
                        src={img}
                        alt={`Tweet image ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img)}
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/80"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon size={40} strokeWidth={1} />
                  <p className="mt-2">No images added yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="scheduling" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="schedule-tweet"
                  checked={scheduled}
                  onCheckedChange={setScheduled}
                />
                <Label htmlFor="schedule-tweet">Schedule this tweet</Label>
              </div>
              
              {scheduled && (
                <div>
                  <Label htmlFor="schedule-time">Schedule Time</Label>
                  <Input
                    id="schedule-time"
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!content.trim()}>
            {initialTweet ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}