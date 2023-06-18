'use client';
import { Chat } from '@/components/Chat/Chat';
import { ChatInput } from '@/components/Chat/ChatInput';
import { ResetChat } from '@/components/Chat/ResetChat';
import { ChatMessage } from '@/components/Chat/ChatMessage';
import { ChatLoader } from '@/components/Chat/ChatLoader';

import { Footer } from '@/components/Layout/Footer';
import { Navbar } from '@/components/Layout/Navbar';
import { Message } from '@/types';
import Head from 'next/head';
import NoSSR from 'react-no-ssr';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: 40.73, lng: -73.93 });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    const backendUrl = process.env.BACKEND_URL;

    console.log('Sending to ', backendUrl);
    const response = await axios.post(
      `${backendUrl}/api/chat`,
      { messages: updatedMessages, location: location },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status != 200) {
      setLoading(false);
      console.log('RESPONSE FAILED:', response);
      throw new Error(response.statusText);
    }

    console.log('RESPONSE SUCCESSFUL', response);
    const data = response.data;
    if (!data) {
      return;
    }

    setLoading(false);
    setMessages(data['messages']);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Hello! I am a helpful AI assistant designed to help you choose a restaurant. To begin, what type of cuisine you are in the mood for?`,
      },
    ]);
  };

  function getGeoLocation() {
    console.log('Getting Location');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation not supported');
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ lat: latitude, lng: longitude });
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
    function error() {
      console.log('Unable to retrieve your location');
    }
  }

  useEffect(() => {
    getGeoLocation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Hello! I am a helpful AI assistant designed to help you choose a restaurant. To begin, what type of cuisine you are in the mood for?`,
      },
      // {
      //   role: "assistant-image",
      //   content: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png`,
      // },
      // {
      //   role: "assistant-images",
      //   content: [
      //     `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png`,
      //     `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png`,
      //     `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png`,
      //   ],
      // },
      // {
      //   role: "assistant-map",
      //   content: {
      //     center: { lat: 40.73, lng: -73.93 },
      //     zoom: 12,
      //     markers: [
      //       { lat: 40.73, lng: -73.93, title: "This is a Marker" },
      //       { lat: 40.63, lng: -73.89, title: "This is Marker 2" },
      //     ],
      //   },
      // },
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
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col h-screen">
          <div className="flex h-[60px] border-b border-neutral-300 py-4 px-4 sm:px-8 items-center justify-between">
            <div className="font-bold text-3xl flex items-center">
              <a
                className="ml-2 hover:opacity-50"
                href="https://code-scaffold.vercel.app"
              >
                Where Should I Eat?
              </a>
            </div>
            <div className="flex justify-end items-center">
              <ResetChat onReset={handleReset} />
            </div>
          </div>

          <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
            <div className="max-w-[900px] mx-auto mt-4 sm:mt-12">
              <div className="flex flex-col rounded-lg px-2 sm:p-4">
                {messages.map((message, index) => (
                  <div key={index} className="my-1 sm:my-1.5">
                    <ChatMessage message={message} />
                  </div>
                ))}
                {loading && (
                  <div className="my-1 sm:my-1.5">
                    <ChatLoader />
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>
            <Footer />
          </div>
          <div className="flex h-[30px] py-2 px-8 items-center justify-center">
            <div className="mt-2 w-full lg:w-2/3">
              <ChatInput onSend={handleSend} />
            </div>
          </div>
        </div>
      </NoSSR>
    </>
  );
}
