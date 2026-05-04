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
          className="flex items-center gap-2 text-[#4B5563] dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all text-sm lg:text-base font-extrabold group p-0 h-auto no-underline hover:no-underline"
        >
          <span className="relative">
            See how it works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-700 dark:bg-emerald-500 transition-all group-hover:w-full"></span>
          </span>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 group-hover:bg-emerald-700 dark:group-hover:bg-emerald-500 group-hover:border-transparent transition-colors">
            <Play className="w-2.5 h-2.5 fill-current text-[#4B5563] dark:text-slate-400 group-hover:text-white transition-colors ml-0.5" />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-black border border-white/10 rounded-[24px] shadow-[0_0_50px_rgba(16,185,129,0.15)]">
        <VisuallyHidden.Root>
          <DialogTitle>ApexLearning - How it works</DialogTitle>
        </VisuallyHidden.Root>

        <div className="relative aspect-video w-full bg-[#050505] flex items-center justify-center">
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
