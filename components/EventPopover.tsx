"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import dayjs from "dayjs";
import {
  HiOutlineMenuAlt2,
  HiOutlineMenuAlt4,
} from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import { cn } from "@/lib/utils";

import AddTime from "./AddTime";

interface EventPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
}

export default function EventPopover({
  isOpen,
  onClose,
  date,
}: EventPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  const [selectedTime, setSelectedTime] = useState("00:00");
  const [form, setForm] = useState({
    title: "",
    guests: "",
    description: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, guests, description } = form;

    if (!title || !description || !selectedTime || !date) {
      setStatus({ type: "error", message: "All fields are required" });
      return;
    }

    const dateTime = new Date(`${date}T${selectedTime}:00`);
    const event = {
      title,
      guests,
      description,
      date: dateTime.toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("events") || "[]");
      localStorage.setItem("events", JSON.stringify([...existing, event]));
      setStatus({ type: "success", message: "Event saved successfully" });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch {
      setStatus({ type: "error", message: "Failed to save event" });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-md rounded-lg bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-2 flex items-center justify-between rounded-md bg-slate-100 p-1">
          <HiOutlineMenuAlt4 />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleClose}
          >
            <IoCloseSharp className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form className="space-y-4 p-6" onSubmit={handleSubmit}>
          {/* Title */}
          <Input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Add title"
            className="my-4 rounded-none border-0 border-b text-2xl focus-visible:border-b-2 focus-visible:border-b-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          {/* Type Buttons */}
          <div className="flex items-center justify-between">
            <Button className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700">
              Event
            </Button>
            <Button type="button" variant="ghost">
              Task
            </Button>
            <Button type="button" variant="ghost">
              Appointment <sup className="bg-blue-500 px-1 text-white">new</sup>
            </Button>
          </div>

          {/* Date & Time */}
          <div className="flex items-center space-x-3">
            <FiClock className="size-5 text-gray-600" />
            <div className="flex items-center space-x-3 text-sm">
              <p>{dayjs(date).format("dddd, MMMM D")}</p>
              <AddTime onTimeSelect={setSelectedTime} />
            </div>
          </div>

          {/* Description */}
          <div className="flex items-center space-x-3">
            <HiOutlineMenuAlt2 className="size-5 text-slate-600" />
            <Input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add description"
              className={cn(
                "w-full rounded-lg border-0 bg-slate-100 pl-7 placeholder:text-slate-600",
                "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
            />
          </div>

          {/* Calendar Section */}
          <div className="flex items-center space-x-3">
            <IoMdCalendar className="size-5 text-slate-600" />
            <div>
              <div className="flex items-center space-x-3 text-sm">
                <p>Sanjeeb</p>
                <div className="h-4 w-4 rounded-full bg-violet-500" />
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <span>Busy</span>
                <div className="h-1 w-1 rounded-full bg-gray-500" />
                <span>Default visibility</span>
                <div className="h-1 w-1 rounded-full bg-gray-500" />
                <span>Notify 30 minutes before</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-2">
            <Button type="submit">Save</Button>
          </div>

          {/* Feedback */}
          {status && (
            <p
              className={cn(
                "mt-2 px-6",
                status.type === "error" ? "text-red-500" : "text-green-500"
              )}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
