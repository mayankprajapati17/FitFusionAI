
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@progress/kendo-react-inputs";
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const mockBotResponses = [
  "Here's a great 3-day full-body workout routine for beginners that focuses on compound movements and gradual progression.",
  "For weight loss, focus on creating a calorie deficit through both diet and exercise. I recommend a combination of strength training and cardio.",
  "To build muscle, you need to focus on progressive overload, proper nutrition with adequate protein, and sufficient recovery time.",
  "A good stretching routine should include dynamic stretches before workouts and static stretches afterward. Hold each stretch for 20-30 seconds.",
  "For post-workout nutrition, aim to consume protein and carbs within 30 minutes. Good options include a protein shake with fruit or chicken and rice.",
];

const generateBotResponse = (userMessage: string) => {
  // A very simple keyword-based response system
  const lowercaseMessage = userMessage.toLowerCase();
  
  if (lowercaseMessage.includes('workout') || lowercaseMessage.includes('routine')) {
    return mockBotResponses[0];
  } else if (lowercaseMessage.includes('weight loss') || lowercaseMessage.includes('lose weight')) {
    return mockBotResponses[1];
  } else if (lowercaseMessage.includes('muscle') || lowercaseMessage.includes('strength')) {
    return mockBotResponses[2];
  } else if (lowercaseMessage.includes('stretch') || lowercaseMessage.includes('flexibility')) {
    return mockBotResponses[3];
  } else if (lowercaseMessage.includes('nutrition') || lowercaseMessage.includes('food') || lowercaseMessage.includes('eat')) {
    return mockBotResponses[4];
  } else {
    return "I'm your AI fitness assistant. Ask me about workout routines, nutrition advice, or fitness tips!";
  }
};

const GymChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI fitness assistant. How can I help you with your fitness journey today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onAddWorkoutClick={() => {}} />

      <div className="fitness-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-elegant overflow-hidden">
            <div className="p-6 bg-fitness-900 text-white">
              <h2 className="text-2xl font-bold">Fitness Assistant</h2>
              <p className="text-white/80">Ask me anything about workouts, nutrition, or fitness tips</p>
            </div>

            {/* Messages Container */}
            <div className="h-[500px] overflow-y-auto p-6 bg-slate-50">
              <div className="flex flex-col space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-fitness-600 text-white'
                          : 'bg-white shadow-sm border border-slate-200'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-slate-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex space-x-2">
                <Input
                  className="flex-1 elegant-input"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-fitness-600 hover:bg-fitness-700"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymChatbot;
