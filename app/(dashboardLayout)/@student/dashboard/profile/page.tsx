"use client";

import React from "react";
import { Camera, Save, User, Mail, Phone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileEditPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-slate-500">Update your profile information and preferences.</p>
      </div>

      <div className="grid gap-8">
        {/* Avatar Section */}
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

        {/* Info Section */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>These details will be visible to your tutors.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Alex" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Rivera" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input id="email" className="pl-10" defaultValue="alex@example.com" disabled />
              </div>
              <p className="text-[10px] text-slate-400 italic">Email cannot be changed manually.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <Input id="phone" className="pl-10" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <Input id="timezone" className="pl-10" defaultValue="GMT -5 (Eastern Time)" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">About You (Optional)</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell your tutors about your learning goals..."
                className="min-h-[100px]"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button variant="outline">Discard Changes</Button>
              <Button className="bg-rose-600 hover:bg-rose-700 px-8">
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}