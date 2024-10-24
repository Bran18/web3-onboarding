import ChatInterface from '@/components/sections/ai-assistant/chat-interface';

export const metadata = {
  title: 'AI Assistant - Web3 Learning Platform',
  description: 'Get help understanding Web3 concepts with our AI assistant',
};

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Onboard3 AI Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions about Web3, blockchain, and cryptocurrency. 
          I&apos;ll explain complex concepts using familiar Web2 analogies.
        </p>
      </div>
      <ChatInterface />
    </div>
  );
}