import { Message, ReplaceResult, ButtonProps } from "@/types";
import React from "react";
import { FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import GoogleMapReact from "google-map-react";

import "swiper/css";
import "swiper/css/navigation";

interface Props {
  message: Message;
  onClickTag: Function;
}

export const ChatMessage: FC<Props> = ({ message, onClickTag }) => {
  const handleClick = (content: string) => {
    onClickTag(content);
  };

  function Button({ content }: ButtonProps): JSX.Element {
    return (
      <button
        onClick={() => handleClick(content)}
        className="rounded transition-all duration-200 underline text-blue-500 hover:shadow-md hover:bg-orange-300 hover:text-blue-700"
      >
        {content}
      </button>
    );
  }

  function replaceWithButtons(str: string): ReplaceResult[] {
    const regex = /\*(.*?)\*/g;
    const result: ReplaceResult[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(str)) !== null) {
      const buttonContent = match[1];
      const buttonElement = (
        <Button key={match.index} content={buttonContent} />
      );

      // Add the text before the matched substring
      if (match.index > lastIndex) {
        const beforeText = str.substring(lastIndex, match.index);
        result.push(beforeText);
      }

      // Add the button element
      result.push(buttonElement);

      lastIndex = regex.lastIndex;
    }

    // Add the remaining text after the last match
    if (lastIndex < str.length) {
      const afterText = str.substring(lastIndex);
      result.push(afterText);
    }

    return result;
  }

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
                <img className="h-full block m-auto" src={url}></img>
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
        console.log("Rendering Marker", marker_info)
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
        marker.addListener('click', function () {
          console.log(marker_info.link);
          window.open(marker_info.link);
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
          {<div>{replaceWithButtons(message.content)}</div>}
        </div>
      </div>
    );
};
