import { Message } from '@/types';
import React from 'react';
import { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  if (message.role === 'assistant-images') {
    if(typeof(message.content)==="string"){
      return <></>
    }
      return (
        <div className="flex justify-start max-w-[67%]">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="rounded-2xl"
          >
            {message.content.map((url, index) => {
              return (
                <SwiperSlide>
                  <img src={url}></img>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      );
  }
  
  if(typeof(message.content)!=="string"){
      return <></>
  }
  if (message.role === 'assistant-image'){
    return (
      <div className="flex flex-col items-start">
        <img
          src={message.content}
          className="rounded-2xl px-1 py-2 max-w-[67%]"
        ></img>
      </div>
    ); 
  }
  if (message.role === 'assistant' || message.role === 'user')
    return (
      <div
        className={`flex flex-col ${
          message.role === 'assistant' ? 'items-start' : 'items-end'
        }`}
      >
        <div
          className={`flex items-center ${
            message.role === 'assistant'
              ? 'bg-neutral-200 text-neutral-900'
              : 'bg-blue-500 text-white'
          } rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
          style={{ overflowWrap: 'anywhere' }}
        >
          {message.content}
        </div>
      </div>
    );
};
