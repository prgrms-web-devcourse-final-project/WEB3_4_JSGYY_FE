"use client";

import { useEffect, useState } from "react";

interface ChatRoom {
  id: string;
  title: string;
  nickname: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount?: number;
}

interface ChatRoomListProps {
  chatRooms: ChatRoom[];
  selectedRoomId?: string;
  onRoomSelect: (roomId: string) => void;
}

export default function ChatRoomList({
  chatRooms,
  selectedRoomId,
  onRoomSelect,
}: ChatRoomListProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-lg font-semibold">채팅</h1>
      </div>
      <div className="flex-1 overflow-y-auto divide-y">
        {chatRooms.map((room) => (
          <div
            key={room.id}
            className={`p-4 hover:bg-gray-100 cursor-pointer ${
              selectedRoomId === room.id ? "bg-gray-100" : ""
            }`}
            onClick={() => onRoomSelect(room.id)}
          >
            <div className="flex gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-semibold truncate">
                    {room.title}
                  </span>
                  {room.lastTimestamp && (
                    <span className="text-xs text-gray-500">
                      {room.lastTimestamp}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {room.lastMessage && room.lastMessage !== "0"
                    ? room.lastMessage
                    : ""}
                </p>
              </div>
              {room.unreadCount && room.unreadCount > 0 && (
                <div className="ml-2">
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {room.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
