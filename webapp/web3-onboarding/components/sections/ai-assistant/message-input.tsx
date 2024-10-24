'use client'

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon, StopCircle } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface MessageInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onStop: () => void;
}

export default function MessageInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  onStop,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder="Ask anything about Web3..."
        disabled={isLoading}
        className="min-h-[60px] flex-1 resize-none rounded-md"
        rows={1}
      />
      {isLoading ? (
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onStop}
          className="h-auto"
        >
          <StopCircle className="h-5 w-5" />
        </Button>
      ) : (
        <Button 
          type="submit" 
          disabled={!input.trim()}
          className="h-auto"
        >
          <SendIcon className="h-5 w-5" />
        </Button>
      )}
    </form>
  );
}