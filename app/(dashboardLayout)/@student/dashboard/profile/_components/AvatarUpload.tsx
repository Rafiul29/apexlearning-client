// _components/AvatarUpload.tsx
import { Camera, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AvatarUpload() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Profile Picture</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 overflow-hidden">
            <User size={40} className="text-slate-400" />
          </div>
          <button className="absolute inset-0 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera size={20} />
          </button>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Click image to upload a new avatar</p>
          <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 2MB.</p>
        </div>
      </CardContent>
    </Card>
  );
}