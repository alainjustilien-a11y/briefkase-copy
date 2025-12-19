import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Send, Sparkles, Upload, X } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

export default function CareerAgent() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    initConversation();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initConversation = async () => {
    try {
      const conv = await base44.agents.createConversation({
        agent_name: "CareerIntelligenceAgent",
        metadata: {
          name: "Resume Analysis Session",
          description: "Career Intelligence Analysis"
        }
      });
      setConversation(conv);
      setMessages(conv.messages || []);

      // Subscribe to updates
      base44.agents.subscribeToConversation(conv.id, (data) => {
        setMessages(data.messages);
      });
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast.error("Failed to initialize chat");
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => 
        base44.integrations.Core.UploadFile({ file })
      );
      const results = await Promise.all(uploadPromises);
      const fileUrls = results.map(r => r.file_url);
      setUploadedFiles(prev => [...prev, ...fileUrls]);
      toast.success(`${files.length} file(s) uploaded`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload files");
    }
    setUploading(false);
  };

  const handleSend = async () => {
    if (!input.trim() && uploadedFiles.length === 0) return;
    if (!conversation) {
      toast.error("Conversation not ready");
      return;
    }

    setIsLoading(true);
    try {
      const messageData = {
        role: "user",
        content: input.trim() || "Analyze the uploaded files"
      };

      if (uploadedFiles.length > 0) {
        messageData.file_urls = uploadedFiles;
      }

      await base44.agents.addMessage(conversation, messageData);
      setInput("");
      setUploadedFiles([]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
    setIsLoading(false);
  };

  const removeFile = (url) => {
    setUploadedFiles(prev => prev.filter(f => f !== url));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Career Intelligence Agent</h1>
              <p className="text-slate-600">Transform your resume into ATS-optimized materials</p>
            </div>
          </div>
        </div>

        <Card className="bg-white shadow-xl">
          {/* Messages Container */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Sparkles className="w-16 h-16 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Welcome to Career Intelligence
                </h3>
                <p className="text-slate-600 max-w-md">
                  Upload your resume and I'll help you create an ATS-optimized resume, 
                  digital portfolio summary, and candidate intelligence brief.
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    ) : (
                      <ReactMarkdown
                        className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="mb-2 ml-4 list-disc">{children}</ul>,
                          ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-bold mb-2">{children}</h3>,
                          code: ({ inline, children }) =>
                            inline ? (
                              <code className="bg-slate-200 px-1 rounded text-xs">{children}</code>
                            ) : (
                              <code className="block bg-slate-900 text-white p-2 rounded text-xs overflow-x-auto">
                                {children}
                              </code>
                            ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-4">
            {uploadedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {uploadedFiles.map((url, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-50 text-amber-900 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                  >
                    <span>File {idx + 1}</span>
                    <button onClick={() => removeFile(url)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || isLoading}
                className="flex-shrink-0"
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
              </Button>
              <Input
                placeholder="Ask about your resume or upload a file..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && uploadedFiles.length === 0)}
                className="bg-amber-500 hover:bg-amber-600 text-white flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}