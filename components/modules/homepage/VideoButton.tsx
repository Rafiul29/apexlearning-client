"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, Play } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function VideoButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400 hover:text-[#FF6B6B] dark:hover:text-[#FF6B6B] transition-all text-sm lg:text-base font-semibold group p-0 h-auto no-underline hover:no-underline"
        >
          <span className="relative">
            See how it works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B6B] transition-all group-hover:w-full"></span>
          </span>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-[#FF6B6B] transition-colors">
            <Play className="w-2.5 h-2.5 fill-current group-hover:text-white transition-colors ml-0.5" />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-black border-none rounded-[32px] shadow-[0_0_50px_rgba(255,107,107,0.15)]">
        <VisuallyHidden.Root>
          <DialogTitle>ApexLearning - How it works</DialogTitle>
        </VisuallyHidden.Root>

        <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
          {/* You can replace this URL with your actual ApexLearning demo video */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ScMzIvxBSi4"
            title="ApexLearning Platform Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
