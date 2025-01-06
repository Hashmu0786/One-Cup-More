import React from "react";

export default function TestimonialSkeleton() {
  return (
    <div className="w-full lg:pl-20 h-auto md:col-span-2 md:w-4/5 lg:w-full md:ml-auto lg:col-span-3 pt-10 md:pt-0 relative flex items-center justify-center animate-pulse">
      <div className="w-full h-full rounded-md flex flex-col gap-4 p-4 md:py-4 lg:px-8 bg-secondary">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="w-full flex items-center gap-2">
          <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden flex items-center gap-5">
            <div className="w-full h-full bg-gray-300 rounded"></div>
          </div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className="text-xl absolute top-1/2 -translate-y-1/2 -left-4 lg:left-16 z-10 bg-primary/60 rounded-full w-8 h-8"></div>
        <div className="text-xl absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-4 z-10 bg-primary/60 rounded-full w-8 h-8"></div>
      </div>
    </div>
  );
}
