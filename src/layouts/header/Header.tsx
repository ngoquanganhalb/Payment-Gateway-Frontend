import { Bell, Settings, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Header() {
  return (
    <div className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100">
              <div className="h-5 w-5 rounded bg-blue-600" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              BankDash.
            </span>
          </div>

          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-gray-700">Overview</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for something"
              className="pl-9 rounded-2xl bg-gray-50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-gray-200"
            />
          </div>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-2xl bg-gray-50"
          >
            <Settings className="h-5 w-5 text-gray-500" />
          </Button>

          {/* Notification */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-2xl bg-gray-50"
          >
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* Avatar */}
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://i.pravatar.cc/100" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
