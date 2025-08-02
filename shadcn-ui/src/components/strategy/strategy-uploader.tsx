import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, File } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StrategyData {
  type: "file" | "json" | "text";
  file?: File;
  data?: Record<string, unknown>;
  content?: string;
}

export function StrategyUploader({ onUpload }: { onUpload: (data: StrategyData) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [jsonContent, setJsonContent] = useState("");
  const [textContent, setTextContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("file");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError(null);
      
      // Read file content for preview
      if (selectedFile.type === "application/pdf" || 
          selectedFile.type === "application/json" || 
          selectedFile.type === "text/plain") {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          if (selectedFile.type === "application/json") {
            try {
              // Try to parse JSON to validate it
              JSON.parse(event.target?.result as string);
            } catch (e) {
              setError("Invalid JSON format");
            }
          }
        };
        
        if (selectedFile.type === "application/json" || selectedFile.type === "text/plain") {
          reader.readAsText(selectedFile);
        } else {
          // For PDF files, we can't preview content easily
        }
      } else {
        setError("Unsupported file type. Please upload PDF, JSON, or text file.");
        setFile(null);
      }
    }
  };

  const handleJsonInput = (content: string) => {
    setJsonContent(content);
    setError(null);
    
    try {
      // Validate JSON
      if (content.trim()) {
        JSON.parse(content);
      }
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  const handleUpload = () => {
    try {
      switch (activeTab) {
        case "file": {
          if (!file) {
            setError("Please select a file to upload");
            return;
          }
          // Will process the file in the parent component
          onUpload({ type: "file", file });
          break;
        }
          
        case "json": {
          if (!jsonContent.trim()) {
            setError("Please enter JSON content");
            return;
          }
          const parsedData = JSON.parse(jsonContent);
          onUpload({ type: "json", data: parsedData });
          break;
        }
          
        case "text": {
          if (!textContent.trim()) {
            setError("Please enter text content");
            return;
          }
          onUpload({ type: "text", content: textContent });
          break;
        }
      }

      // Reset form after successful upload
      setFile(null);
      setJsonContent("");
      setTextContent("");
      setError(null);
      
    } catch (e) {
      setError(`Error processing content: ${(e as Error).message}`);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="file" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="json">JSON Input</TabsTrigger>
            <TabsTrigger value="text">Text Input</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4 mt-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="strategy-file">Upload Strategy Document</Label>
              <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileText size={40} strokeWidth={1} className="text-primary" />
                    <span className="font-medium">{file.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={40} strokeWidth={1} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PDF, JSON, or text file (max 5MB)
                    </span>
                  </div>
                )}
                <Input
                  id="strategy-file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.json,.txt"
                  className="hidden"
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => document.getElementById("strategy-file")?.click()}
                className="w-full"
              >
                Select File
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="json" className="space-y-4 mt-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="json-input">JSON Content</Label>
              <Textarea
                id="json-input"
                placeholder='{"strategy": "Enter your marketing strategy as JSON"}'
                value={jsonContent}
                onChange={(e) => handleJsonInput(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4 mt-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="text-input">Plain Text</Label>
              <Textarea
                id="text-input"
                placeholder="Enter your marketing strategy as plain text"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Button onClick={handleUpload} className="mt-4">
          <Upload size={16} className="mr-2" /> Upload Strategy
        </Button>
      </CardContent>
    </Card>
  );
}