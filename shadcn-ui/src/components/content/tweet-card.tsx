import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tweet } from "@/types";
import { Calendar, Edit, Trash, Check, X, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TweetCardProps {
  tweet: Tweet;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onEdit?: (tweet: Tweet) => void;
  onDelete?: (id: string) => void;
  onSchedule?: (tweet: Tweet) => void;
}

export function TweetCard({
  tweet,
  onApprove,
  onReject,
  onEdit,
  onDelete,
  onSchedule,
}: TweetCardProps) {
  const getBadgeColor = (type: Tweet["type"]) => {
    switch (type) {
      case "meme":
        return "bg-purple-500";
      case "educational":
        return "bg-blue-500";
      case "engagement":
        return "bg-green-500";
      case "reply":
        return "bg-amber-500";
      case "cta":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: Tweet["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-400";
      case "approved":
        return "bg-green-500";
      case "published":
        return "bg-blue-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <Badge className={getBadgeColor(tweet.type)}>{tweet.type}</Badge>
            <Badge className={getStatusColor(tweet.status)}>{tweet.status}</Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="whitespace-pre-wrap">{tweet.content}</p>
        
        {tweet.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tweet.hashtags.map((hashtag, index) => (
              <span key={index} className="text-blue-500 text-sm">
                #{hashtag}
              </span>
            ))}
          </div>
        )}
        
        {tweet.images && tweet.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {tweet.images.map((image, index) => (
              <div 
                key={index}
                className="bg-gray-100 rounded-md aspect-video flex items-center justify-center overflow-hidden"
              >
                <img 
                  src={image} 
                  alt={`Tweet image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
        
        {tweet.scheduled && tweet.scheduledTime && (
          <div className="mt-3 flex items-center text-sm text-muted-foreground">
            <Clock size={14} className="mr-1" />
            <span>Scheduled for: {new Date(tweet.scheduledTime).toLocaleString()}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 border-t flex flex-wrap gap-2">
        {onEdit && (
          <Button variant="outline" size="sm" onClick={() => onEdit(tweet)}>
            <Edit size={14} className="mr-1" /> Edit
          </Button>
        )}
        
        {onSchedule && !tweet.scheduled && (
          <Button variant="outline" size="sm" onClick={() => onSchedule(tweet)}>
            <Calendar size={14} className="mr-1" /> Schedule
          </Button>
        )}
        
        {tweet.status === "draft" && (
          <>
            {onApprove && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-green-500 border-green-500 hover:bg-green-50"
                onClick={() => onApprove(tweet.id)}
              >
                <Check size={14} className="mr-1" /> Approve
              </Button>
            )}
            
            {onReject && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={() => onReject(tweet.id)}
              >
                <X size={14} className="mr-1" /> Reject
              </Button>
            )}
          </>
        )}
        
        {onDelete && (
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto text-red-500 hover:bg-red-50"
            onClick={() => onDelete(tweet.id)}
          >
            <Trash size={14} />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}