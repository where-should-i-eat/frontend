"use client"
import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";
import { Message } from "@/types";
import Head from "next/head";
import NoSSR from 'react-no-ssr';
import { useEffect, useRef, useState } from "react";
import axios from 'axios'

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    const backendUrl = process.env.BACKEND_URL;

    console.log("Sending to ", backendUrl)
    const response = await axios.post(`${backendUrl}/api/chat`, 
      {messages: updatedMessages},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )

    if (response.status!=200) {
      setLoading(false);
      console.log("RESPONSE FAILED:", response)
      throw new Error(response.statusText);
    }

    console.log("RESPONSE SUCCESSFUL", response)
    const data = response.data;
    if (!data) {
      return;
    }

    setLoading(false);
    setMessages(data["messages"]);
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
      }
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
      },
      {
        role: "assistant-image",
        content: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png`
      },
      {
        role: "assistant-images",
        content: [`https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png`, `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png`, `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png`]
      },
      {
        role: "assistant-map",
        content: {
          center: {lat: 40.73, lng: -73.93}, 
          zoom: 12,
          marker: {lat: 40.73, lng: -73.93, title: "This is a Marker"}
        }
      },
    ]);
  }, []);

  return (
    <>
    <NoSSR>
      <Head>
        <title>Chatbot UI</title>
        <meta
          name="description"
          content="A simple chatbot starter kit for OpenAI's chat model using Next.js, TypeScript, and Tailwind CSS."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[900px] mx-auto mt-4 sm:mt-12">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
        <Footer />
      </div>
    </NoSSR>
    </>
  );
}
