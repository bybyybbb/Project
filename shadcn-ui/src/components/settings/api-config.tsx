import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ApiConfig {
  openaiApiKey: string;
  twitterApiKey: string;
  twitterApiKeySecret: string;
  twitterAccessToken: string;
  twitterAccessTokenSecret: string;
}

interface ApiConfigProps {
  onSave: (config: ApiConfig) => Promise<boolean>;
  initialConfig?: Partial<ApiConfig>;
}

export function ApiConfigForm({ onSave, initialConfig = {} }: ApiConfigProps) {
  const [config, setConfig] = useState<ApiConfig>({
    openaiApiKey: initialConfig.openaiApiKey || "",
    twitterApiKey: initialConfig.twitterApiKey || "",
    twitterApiKeySecret: initialConfig.twitterApiKeySecret || "",
    twitterAccessToken: initialConfig.twitterAccessToken || "",
    twitterAccessTokenSecret: initialConfig.twitterAccessTokenSecret || "",
  });
  
  const [status, setStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  const handleInputChange = (field: keyof ApiConfig, value: string) => {
    setConfig({ ...config, [field]: value });
    // Reset status when user makes changes
    if (status.success || status.error) {
      setStatus({ loading: false, success: false, error: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      const success = await onSave(config);
      
      setStatus({
        loading: false,
        success: success,
        error: success ? null : "Failed to save API configuration",
      });
      
      // Clear success message after some time
      if (success) {
        setTimeout(() => {
          setStatus(s => ({ ...s, success: false }));
        }, 3000);
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: `Error: ${(error as Error).message}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Configure the necessary API keys for the Twitter Marketing System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">OpenAI Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Required for AI-powered content generation
              </p>
            </div>
            
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="openai-api-key">OpenAI API Key</Label>
                <Input
                  id="openai-api-key"
                  type="password"
                  placeholder="sk-..."
                  value={config.openaiApiKey}
                  onChange={(e) => handleInputChange("openaiApiKey", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Get your API key from the{" "}
                  <a
                    href="https://platform.openai.com/account/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    OpenAI dashboard
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <div>
              <h3 className="text-lg font-medium">Twitter API Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Required for posting and monitoring tweets
              </p>
            </div>
            
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="twitter-api-key">API Key</Label>
                <Input
                  id="twitter-api-key"
                  type="password"
                  placeholder="Twitter API Key"
                  value={config.twitterApiKey}
                  onChange={(e) => handleInputChange("twitterApiKey", e.target.value)}
                />
              </div>
              
              <div className="grid gap-1.5">
                <Label htmlFor="twitter-api-secret">API Key Secret</Label>
                <Input
                  id="twitter-api-secret"
                  type="password"
                  placeholder="Twitter API Key Secret"
                  value={config.twitterApiKeySecret}
                  onChange={(e) => handleInputChange("twitterApiKeySecret", e.target.value)}
                />
              </div>
              
              <div className="grid gap-1.5">
                <Label htmlFor="twitter-access-token">Access Token</Label>
                <Input
                  id="twitter-access-token"
                  type="password"
                  placeholder="Twitter Access Token"
                  value={config.twitterAccessToken}
                  onChange={(e) => handleInputChange("twitterAccessToken", e.target.value)}
                />
              </div>
              
              <div className="grid gap-1.5">
                <Label htmlFor="twitter-access-secret">Access Token Secret</Label>
                <Input
                  id="twitter-access-secret"
                  type="password"
                  placeholder="Twitter Access Token Secret"
                  value={config.twitterAccessTokenSecret}
                  onChange={(e) => handleInputChange("twitterAccessTokenSecret", e.target.value)}
                />
              </div>
              
              <p className="text-xs text-muted-foreground">
                Get your Twitter API credentials from the{" "}
                <a
                  href="https://developer.twitter.com/en/portal/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Twitter Developer Portal
                </a>
              </p>
            </div>
          </div>
          
          {status.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{status.error}</AlertDescription>
            </Alert>
          )}
          
          {status.success && (
            <Alert variant="success" className="bg-green-50 text-green-800 border-green-200">
              <Check className="h-4 w-4 text-green-500" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>API configuration saved successfully</AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={status.loading}
          >
            {status.loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Configuration"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}