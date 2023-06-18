import { Message } from '@/types';
import React from 'react';
import { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import GoogleMapReact from 'google-map-react';

import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  if (message.role === 'assistant-images' && Array.isArray(message.content)) {
      return (
        <div className="flex justify-start max-w-[67%]">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="rounded-2xl"
          >
            {message.content.map((url, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={url}></img>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      );
  }
  if (message.role === 'assistant-map' && typeof message.content === 'object' && !Array.isArray(message.content ) ){
    console.log("Printing Map", message.content);
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    message.content.center as any;
    const renderMarkers = (map:any, maps:any) => {
      let marker = new maps.Marker({
        position: {
          lat: ((message.content as any).marker as any).lat,
          lng: ((message.content as any).marker as any).lng,
        },
        map,
        title: ((message.content as any).marker as any).title,
      });
      let infowindow = new maps.InfoWindow({
        content: ((message.content as any).marker as any).title,
      });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });
      
      return marker;
    };
    return (
      <div
        className="flex justify-start max-w-[67%] max-h-[67%]"
        style={{ height: '100vh', width: '100%' }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          }}
          defaultCenter={message.content.center}
          defaultZoom={message.content.zoom}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        ></GoogleMapReact>
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
