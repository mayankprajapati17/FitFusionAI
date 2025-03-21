import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Fade } from '@progress/kendo-react-animation';
import { Loader } from '@progress/kendo-react-indicators'; // Import KendoReact Loader
import { Dumbbell, HelpCircle, RefreshCw, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Message type definition
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

// Pre-defined responses for common fitness questions
const fitnessResponses: Record<string, string> = {
  workout: "For beginners, start with 2-3 full-body workouts per week. Include basic compound exercises like squats, push-ups, and rows. Aim for 2-3 sets of 8-12 reps with proper form. Rest 1-2 minutes between sets and take a day off between workouts.",
  nutrition: "A balanced diet for fitness should include lean proteins (chicken, fish, tofu), complex carbs (brown rice, sweet potatoes), healthy fats (avocado, nuts), and plenty of fruits and vegetables. Aim to eat every 3-4 hours and stay hydrated.",
  cardio: "For beginners, start with 20-30 minutes of moderate cardio 3 times per week. Options include walking, cycling, or swimming. You can gradually increase duration and intensity as your fitness improves.",
  strength: "Focus on proper form before adding weight. Start with bodyweight exercises or light weights, and progress gradually. Key exercises include squats, deadlifts, bench press, rows, and overhead press.",
  stretching: "Dynamic stretches are best before workouts (arm circles, leg swings), while static stretches (holding for 15-30 seconds) work better after. Include foam rolling to release muscle tension.",
  rest: "Rest days are crucial for muscle recovery and growth. Aim for 1-2 rest days per week. Active recovery like light walking or yoga can help on these days.",
  motivation: "Set specific, measurable goals. Find workouts you enjoy. Track your progress. Consider a workout buddy or group class for accountability. Remember that consistency matters more than perfection.",
  weight: "Weight loss comes down to calorie deficit - burning more calories than you consume. Combine strength training, cardio, and a balanced diet. Aim for 1-2 pounds of weight loss per week for sustainability.",
  muscle: "To build muscle, ensure you're in a slight calorie surplus, consume adequate protein (1.6-2.2g per kg of bodyweight), follow a progressive overload strength program, and prioritize recovery with enough sleep and rest days.",
  injury: "For minor injuries, remember RICE: Rest, Ice, Compression, Elevation. Stop exercising the injured area and consult a healthcare professional if pain persists for more than a few days.",
  "belly fat": "Spot reduction is a myth - you can't target fat loss from specific areas. To lose belly fat, focus on overall fat loss through a calorie deficit diet, regular strength training, cardio, and stress management. Aim for 7-9 hours of quality sleep and stay hydrated.",
  "muscle gain": "For muscle gain, follow a progressive overload program 3-5 days per week focusing on compound movements. Consume 1.6-2.2g of protein per kg of bodyweight daily, eat in a slight calorie surplus (200-300 calories), and prioritize recovery with 7-9 hours of sleep.",
  "post-workout": "Effective post-workout recovery includes consuming protein and carbs within 30-60 minutes, staying hydrated, getting 7-9 hours of sleep, using foam rolling or massage, taking rest days, and considering contrast therapy (alternating hot and cold).",
  "diet for weight loss": "For weight loss, create a moderate calorie deficit (300-500 calories/day), emphasize protein (1.6-2.2g/kg bodyweight), eat plenty of fiber-rich vegetables, stay hydrated, limit processed foods and added sugars, practice portion control, and consider meal timing around workouts.",
};

// Common workout questions for suggestions
const suggestedQuestions = [
  "How can I lose belly fat?",
  "What's the best workout plan for muscle gain?",
  "What are the best post-workout recovery tips?",
  "How should I structure my diet for weight loss?"
];

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
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Generate response based on user input
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for keywords in the input
    for (const [keyword, response] of Object.entries(fitnessResponses)) {
      if (input.includes(keyword)) {
        return response;
      }
    }
    
    // Default responses if no keyword matches
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! How can I help with your fitness journey today?";
    }
    
    if (input.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any other fitness questions.";
    }
    
    // Fallback response
    return "I'm here to help with fitness questions about workouts, nutrition, strength training, cardio, stretching, rest, motivation, weight management, muscle building, and injury prevention. Could you provide more details about what you'd like to know?";
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
      // Generate response based on keywords instead of API
      const responseText = generateResponse(userMessage.text);
      
      // Simulate network delay for a more natural feel
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      toast({
        title: "Error",
        description: "Sorry, couldn't connect to the assistant. Please try again.",
        variant: "destructive"
      });
      
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

  // Handle suggestion click
  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
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
                  <Fade key={message.id}>
                    <div
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
                  </Fade>
                ))}
                {isLoading && (
                  <Fade>
                    <div className="flex justify-start">
                      <div className="bg-slate-200 text-slate-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%] flex items-center">
                        <Loader type="converging-spinner" size="medium" />
                      </div>
                    </div>
                  </Fade>
                )}
              </div>
            </ScrollArea>
            
            {/* Suggestions */}
            <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center mb-2">
                <HelpCircle className="h-4 w-4 mr-2 text-slate-500" />
                <span className="text-sm text-slate-600 font-medium">Try asking:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    onClick={() => handleSuggestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
            
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