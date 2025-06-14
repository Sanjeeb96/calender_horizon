import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function HeaderLeft() {
  return (
    <div className="flex items-center gap-3">
      {/* Sidebar Toggle and Calendar Icon */}
      <div className="hidden items-center lg:flex">
        <Button
          variant="ghost"
          className="rounded-full p-2"
          //   onClick={() => setSideBarOpen()}
        >
          <Menu className="size-6" />
        </Button>

        <h1 className="text-xl">Calendar</h1>
      </div>

      {/* Today Button */}
      <Button variant="outline">Today</Button>

      {/* Navigation Controls */}
      <div className="flex items-center gap-3">
        <MdKeyboardArrowLeft
          className="size-6 cursor-pointer font-bold"
          //   onClick={handlePrevClick}
        />
        <MdKeyboardArrowRight
          className="size-6 cursor-pointer font-bold"
          //   onClick={handleNextClick}
        />
      </div>

      {/* Current Month and Year Display */}
      <h1 className="hidden text-xl lg:block">
        {/* {dayjs(new Date(dayjs().year(), selectedMonthIndex)).format(
          "MMMM YYYY"
        )} */}
        JUNE 2025
      </h1>
    </div>
  );
}
