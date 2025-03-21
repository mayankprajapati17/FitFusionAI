
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dumbbell, Send, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Message type definition
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

// Mock responses for demonstration
const mockResponses: Record<string, string> = {
  workout: "Try this beginner workout: 3 sets of 10 push-ups, 15 squats, and a 20-second plank. Rest 60 seconds between sets.",
  protein: "Aim for 0.8-1.2g of protein per kg of body weight daily, depending on your fitness goals. If you're building muscle, lean toward the higher end.",
  cardio: "For effective cardio, aim for 150 minutes of moderate activity or 75 minutes of vigorous activity per week. Mix in HIIT for optimal results.",
  rest: "Rest days are crucial! Aim for 1-2 rest days per week. Active recovery like walking or yoga can help on these days.",
  default: "That's a great gym-related question. To build a balanced fitness routine, combine strength training, cardio, and proper nutrition based on your specific goals."
};

const GymChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI Gym Assistant. Ask me anything about workouts, nutrition, or fitness tips!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Helper to generate mock response based on keywords
  const getMockResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('workout') || lowerQuestion.includes('exercise') || lowerQuestion.includes('training')) {
      return mockResponses.workout;
    } else if (lowerQuestion.includes('protein') || lowerQuestion.includes('nutrition') || lowerQuestion.includes('diet')) {
      return mockResponses.protein;
    } else if (lowerQuestion.includes('cardio') || lowerQuestion.includes('running') || lowerQuestion.includes('heart')) {
      return mockResponses.cardio;
    } else if (lowerQuestion.includes('rest') || lowerQuestion.includes('recovery') || lowerQuestion.includes('sleep')) {
      return mockResponses.rest;
    } else {
      return mockResponses.default;
    }
  };

  // Send a message and get response
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // In a real implementation, you would call the Gemini API here
      // For now, we'll use a timeout to simulate API call and use mock responses
      setTimeout(() => {
        const responseText = getMockResponse(userMessage.text);
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
      
      // Real API implementation would look something like this:
      /*
      const response = await fetch('https://api.gemini.com/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_API_KEY_HERE`
        },
        body: JSON.stringify({
          prompt: `Answer this gym-related question: ${userMessage.text}`,
          max_tokens: 150
        })
      });
      
      const data = await response.json();
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices[0].text,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      */
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the chat history
  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hi there! I'm your AI Gym Assistant. Ask me anything about workouts, nutrition, or fitness tips!",
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onAddWorkoutClick={() => {}} />
      
      <div className="fitness-container py-8">
        <Card className="w-full max-w-3xl mx-auto shadow-elegant">
          <CardHeader className="bg-fitness-900 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6" />
              <CardTitle>AI Gym Chatbot</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-auto bg-transparent border-white/20 text-white hover:bg-white/10"
              onClick={handleClearChat}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Chat
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-4" ref={scrollAreaRef}>
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-fitness-600 text-white rounded-tr-none'
                          : 'bg-slate-200 text-slate-800 rounded-tl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      <span className={`text-xs block mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-slate-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-200 text-slate-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                      <div className="flex gap-1 items-center">
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-slate-200 flex gap-2">
              <Input
                placeholder="Ask about workouts, nutrition, or fitness tips..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputValue.trim()}
                className="bg-fitness-600 hover:bg-fitness-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GymChatbot;
