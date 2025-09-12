"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles, Heart, Brain } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "suggestion" | "assessment"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome to your personal Mind-Sync AI companion! I'm here to provide 24/7 mental health support, personalized guidance, and help you navigate your wellness journey. How can I support you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const quickSuggestions = [
    "I'm feeling anxious",
    "Help me with stress",
    "I need motivation",
    "Breathing exercises",
    "Sleep better tips",
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Placeholder for AI integration
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I understand you're reaching out for support. This is where your AI system will analyze the user's message, consider their assessment history, current mood, and provide personalized mental health guidance. The AI can offer coping strategies, suggest relevant games or exercises, and provide empathetic responses.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Mind-Sync AI Companion
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your personal AI mental health companion, available 24/7 to provide support, guidance, and personalized
            wellness strategies based on your unique needs.
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          {/* Chat Header */}
          <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-white/20 text-white">
                  <Bot className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">AI Companion</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm opacity-90">Online & Ready to Help</span>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  <Heart className="h-3 w-3 mr-1" />
                  Empathetic
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  <Brain className="h-3 w-3 mr-1" />
                  Intelligent
                </Badge>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="h-96 p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-300 text-gray-600">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          <div className="px-6 py-4 border-t bg-gray-50/50">
            <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Quick suggestions to get started:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:text-white transition-all duration-200"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind... I'm here to listen and help."
                className="flex-1 h-12 text-base"
              />
              <Button
                onClick={handleSendMessage}
                className="h-12 px-6 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Your conversations are private and secure. AI responses are for support only, not medical advice.
            </p>
          </div>
        </Card>

        {/* Integration Notice */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bot className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">AI Integration Ready</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                This interface is ready for your AI integration. Connect your preferred AI service (OpenAI, Anthropic,
                etc.) to provide personalized mental health support, assessment insights, and therapeutic guidance based
                on user data and evidence-based practices.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
