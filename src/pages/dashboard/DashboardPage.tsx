import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/layouts/header/Header";
import MyCards from "@/components/MyCards";
import { Input } from "@/components/ui/input";

const DashboardPage = () => {
  // Sample data for the dashboard
  const cards = [
    {
      type: "Balance",
      amount: "$5,756",
      holder: "Eddy Cusuma",
      number: "3778 **** **** 1234",
      validThru: "12/22",
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-800",
      chipColor: "bg-yellow-400",
    },
    {
      type: "Balance",
      amount: "$5,756",
      holder: "Eddy Cusuma",
      number: "3778 **** **** 1234",
      validThru: "12/22",
      bgColor: "bg-gradient-to-r from-gray-400 to-gray-600",
      chipColor: "bg-gray-300",
    },
  ];

  const transactions = [
    {
      id: 1,
      type: "Deposit from my Card",
      date: "28 January 2021",
      amount: "-$850",
      icon: "💳",
      color: "text-red-500",
    },
    {
      id: 2,
      type: "Deposit Paypal",
      date: "25 January 2021",
      amount: "+$2,500",
      icon: "📱",
      color: "text-green-500",
    },
    {
      id: 3,
      type: "Jemi Wilson",
      date: "21 January 2021",
      amount: "+$5,400",
      icon: "👤",
      color: "text-green-500",
    },
  ];

  const weeklyData = [
    { day: "Sat", deposit: 250, withdraw: 150 },
    { day: "Sun", deposit: 450, withdraw: 320 },
    { day: "Mon", deposit: 320, withdraw: 250 },
    { day: "Tue", deposit: 350, withdraw: 280 },
    { day: "Wed", deposit: 480, withdraw: 180 },
    { day: "Thu", deposit: 420, withdraw: 250 },
    { day: "Fri", deposit: 380, withdraw: 320 },
  ];

  const quickTransferContacts = [
    { name: "Livia Bator", role: "CEO", avatar: "/api/placeholder/40/40" },
    { name: "Randy Press", role: "Director", avatar: "/api/placeholder/40/40" },
    { name: "Workman", role: "Designer", avatar: "/api/placeholder/40/40" },
  ];

  return (
    <div className="p-8 bg-background text-foreground">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-8">
          {/* My Cards Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">My Cards</h2>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary hover:bg-accent rounded-xl font-medium"
              >
                See All →
              </Button>
            </div>
            <MyCards cards={cards} />
          </div>

          {/* Weekly Activity */}
          <Card className="border border-border shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-72 px-6">
                {weeklyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <div className="flex items-end gap-2">
                      <div
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-8 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                        style={{ height: `${(data.deposit / 500) * 120}px` }}
                      ></div>
                      <div
                        className="bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-t-lg w-8 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                        style={{ height: `${(data.withdraw / 500) * 120}px` }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                      {data.day}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-8 mt-6 p-4 bg-muted/40 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full shadow-sm"></div>
                  <span className="text-sm text-muted-foreground font-medium">
                    Deposit
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-sm"></div>
                  <span className="text-sm text-muted-foreground font-medium">
                    Withdraw
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-6">
          {/* Recent Transaction */}
          <Card className="border border-border shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">
                Recent Transaction
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 border-b border-border/60 last:border-b-0 hover:bg-muted/40 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:shadow-md transition-shadow">
                        {transaction.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {transaction.type}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <span className={`font-bold text-lg ${transaction.color}`}>
                      {transaction.amount}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Expense Statistics */}
          <Card className="border border-border shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">
                Expense Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-52 h-52 mx-auto">
                <div className="w-full h-full rounded-full relative overflow-hidden shadow-lg">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(
                      #3B82F6 0deg 126deg,
                      #EF4444 126deg 180deg,
                      #F59E0B 180deg 234deg,
                      #EC4899 234deg 306deg,
                      #1E293B 306deg 360deg
                    )`,
                    }}
                  ></div>
                  <div className="absolute inset-10 bg-card rounded-full flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground font-medium">
                        Total
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        $5,756
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                    <span className="font-medium text-slate-700">Others</span>
                  </div>
                  <span className="font-bold text-slate-800">35%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-pink-500 rounded-full shadow-sm"></div>
                    <span className="font-medium text-slate-700">
                      Investment
                    </span>
                  </div>
                  <span className="font-bold text-slate-800">20%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
                    <span className="font-medium text-slate-700">
                      Bill Expense
                    </span>
                  </div>
                  <span className="font-bold text-slate-800">15%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gray-700 rounded-full shadow-sm"></div>
                    <span className="font-medium text-slate-700">
                      Entertainment
                    </span>
                  </div>
                  <span className="font-bold text-slate-800">30%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Transfer */}
          <Card className="border border-border shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">
                Quick Transfer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                {quickTransferContacts.map((contact, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <Avatar className="mb-3 mx-auto ring-2 ring-blue-100 ring-offset-2 group-hover:ring-blue-200 transition-all duration-200 group-hover:scale-105">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                      {contact.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {contact.role}
                    </p>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="rounded-full w-14 h-14 p-0 border-2 border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 transition-all duration-200"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2 font-medium">
                    Write Amount
                  </p>
                  <Input
                    type="text"
                    value="525.50"
                    className="w-full p-4 rounded-2xl text-center font-bold text-lg bg-muted/40 border border-border focus-visible:ring-ring"
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                  Send
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
