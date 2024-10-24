"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Message } from "ai";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface AIMessageProps {
  message: Message;
}

export default function AIMessage({ message }: AIMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-primary/10 p-2">
        <Bot className="h-5 w-5" />
      </div>
      <Card className="flex-1 bg-muted/50 p-4">
        <ReactMarkdown
          components={{
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              if (inline) {
                return (
                  <code
                    className="rounded bg-muted px-1 py-0.5 font-mono text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              const language = match ? match[1] : "text";
              return (
                <div className="relative my-4 rounded-lg">
                  <div className="absolute right-2 top-2 text-xs text-muted-foreground">
                    {language}
                  </div>
                  <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    className="rounded-lg !mt-0 !mb-0"
                    customStyle={{
                      padding: "2rem 1rem 1rem 1rem",
                      margin: 0,
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            },
            a: ({ node, ...props }) => (
              <a
                className="text-primary underline hover:no-underline"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-4 last:mb-0" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="mb-4 list-disc pl-4 last:mb-0" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="mb-4 list-decimal pl-4 last:mb-0" {...props} />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </Card>
    </div>
  );
}
