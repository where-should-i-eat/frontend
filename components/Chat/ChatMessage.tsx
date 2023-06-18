import { Message } from "@/types";
import React from "react";
import { FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import GoogleMapReact from "google-map-react";
import { Parser } from "html-to-react";

import "swiper/css";
import "swiper/css/navigation";

const rawHTML = `
<div>
  <h1>The Second Example</h1>
  <p>The <strong>rat</strong> hates the <strong>cat</strong></p>
  <p><i>This is something special</i></p>
  <hr/>  
  <div>
    <img src="https://www.kindacode.com/wp-content/uploads/2021/06/pi-2.jpeg" width="500"/>
  </div>
  <hr/>  
  <h4>Just Another Heading</h4>
</div>
`;

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  if (message.role === "assistant-images" && Array.isArray(message.content)) {
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
  if (
    message.role === "assistant-map" &&
    typeof message.content === "object" &&
    !Array.isArray(message.content)
  ) {
    console.log("Printing Map", message.content);
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    message.content.center as any;
    const renderMarkers = (map: any, maps: any) => {
      ((message.content as any).markers as any).forEach((marker_info: any) => {
        let marker = new maps.Marker({
          position: {
            lat: marker_info.lat,
            lng: marker_info.lng,
          },
          map,
          title: marker_info.title,
        });
        let infowindow = new maps.InfoWindow({
          content: marker_info.title,
        });
        infowindow.open(map, marker);
      });
    };
    return (
      <div
        className="flex justify-start max-w-[67%] max-h-[67%]"
        style={{ height: "100vh", width: "100%" }}
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

  if (typeof message.content !== "string") {
    return <></>;
  }
  if (message.role === "assistant-image") {
    return (
      <div className="flex flex-col items-start">
        <img
          src={message.content}
          className="rounded-2xl px-1 py-2 max-w-[67%]"
        ></img>
      </div>
    );
  }
  if (message.role === "assistant" || message.role === "user")
    return (
      <div
        className={`flex flex-col ${
          message.role === "assistant" ? "items-start" : "items-end"
        }`}
      >
        <div
          className={`flex items-center ${
            message.role === "assistant"
              ? "bg-neutral-200 text-neutral-900"
              : "bg-blue-500 text-white"
          } rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
          style={{ overflowWrap: "anywhere" }}
        >
          {message.content}
          {Parser().parse(rawHTML)}
        </div>
      </div>
    );
};
