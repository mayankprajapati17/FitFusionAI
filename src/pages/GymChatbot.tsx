import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Fade } from '@progress/kendo-react-animation';
import { Loader } from '@progress/kendo-react-indicators';
import { Dumbbell, HelpCircle, RefreshCw, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const GymChatbot: React.FC = () => {
  const [messages, setMessages] = useState([
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
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Your existing logic...
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = generateResponse(userMessage.text);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: "Couldn't connect to the assistant.",
        variant: 'destructive',
      });

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I couldn't process your request. Please try again.",
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
  };

  const suggestedQuestions = [
    "What are some good workouts?",
    "How should I plan my nutrition?",
    "What are some fitness tips?",
    "How can I lose belly fat?",
    "What's the best workout plan for muscle gain?",
    "How can I improve my stamina?",

  ];

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <Navbar onAddWorkoutClick={() => {}} />

      <div className="fitness-container py-8">
        <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-2xl border border-blue-200">
          {/* Header */}
          <CardHeader className="bg-blue-800 text-white rounded-t-2xl py-4 px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6" />
              <CardTitle className="text-lg font-bold">AI Gym Chatbot</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto bg-transparent border-white/20 text-white hover:bg-white/20 transition"
              onClick={handleClearChat}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Chat
            </Button>
          </CardHeader>

          {/* Chat Area */}
          <CardContent className="p-0 bg-white rounded-b-2xl">
            <ScrollArea className="h-[500px] p-4" ref={scrollAreaRef}>
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <Fade key={message.id}>
                    <div
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 transition ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <span
                          className={`text-xs block mt-1 ${
                            message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </Fade>
                ))}

                {isLoading && (
                  <Fade>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%] flex items-center gap-2">
                        <Loader type="converging-spinner" size="medium" />
                        <span className="text-sm text-gray-500">Typing...</span>
                      </div>
                    </div>
                  </Fade>
                )}
              </div>
            </ScrollArea>

            {/* Suggestions */}
            <div className="px-4 py-3 border-t border-gray-200 bg-blue-50">
              <div className="flex items-center mb-2">
                <HelpCircle className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm text-blue-700 font-medium">Try asking:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-white text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
                    onClick={() => handleSuggestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Field */}
            <div className="p-4 border-t border-gray-200 bg-white flex gap-2">
              <Input
                placeholder="Ask about workouts, nutrition, or fitness tips..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-500 transition"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white transition"
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

function generateResponse(text: string): string {
  // Simple mock implementation for generating a response
  const responses: { [key: string]: string } = {
    workout: "For a great workout, try doing 3 sets of 12 reps of squats, push-ups, and pull-ups.",
    nutrition: "A balanced diet includes a mix of protein, carbs, and fats. Don't forget to stay hydrated!",
    fitness: "Consistency is key! Make sure to set realistic goals and track your progress.",
  };

  const lowerCaseText = text.toLowerCase();
  if (lowerCaseText.includes('workout')) {
    return responses.workout;
  } else if (lowerCaseText.includes('nutrition')) {
    return responses.nutrition;
  } else if (lowerCaseText.includes('fitness')) {
    return responses.fitness;
  } else {
    return "I'm not sure about that. Can you ask something else related to workouts, nutrition, or fitness?";
  }
}
// function removed to fix duplicate implementation error

