'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  Trophy, 
  Flame, 
  Star, 
  Lock,
  Calendar
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Task {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  timestamp?: Date;
}

interface UserProgress {
  level: number;
  currentXP: number;
  requiredXP: number;
  streak: number;
  lastCompleted?: Date;
}

const JourneyDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Set up your first wallet",
      description: "Create and secure your first Web3 wallet",
      xpReward: 50,
      completed: false,
    },
    {
      id: "2",
      title: "Learn about Smart Contracts",
      description: "Understand the basics of smart contracts",
      xpReward: 75,
      completed: false,
    },
    {
      id: "3",
      title: "Complete Basic Security Quiz",
      description: "Test your knowledge of Web3 security",
      xpReward: 100,
      completed: false,
    },
  ]);

  const tomorrowTasks = [
    {
      id: "4",
      title: "Deploy Your First Smart Contract",
      description: "Learn to deploy a basic smart contract",
      xpReward: 150,
      completed: false,
    },
    {
      id: "5",
      title: "Interact with DeFi Protocols",
      description: "Understanding DeFi basics and interactions",
      xpReward: 125,
      completed: false,
    },
  ];

  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    currentXP: 0,
    requiredXP: 200,
    streak: 3,
  });

  const allTodayTasksCompleted = tasks.every(task => task.completed);

  const completeTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId && !task.completed) {
          setProgress((prev) => ({
            ...prev,
            currentXP: prev.currentXP + task.xpReward,
            level: Math.floor((prev.currentXP + task.xpReward) / prev.requiredXP) + 1,
          }));

          return {
            ...task,
            completed: true,
            timestamp: new Date(),
          };
        }
        return task;
      })
    );
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Progress Overview */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Progress</span>
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm">{progress.streak} Day Streak!</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Level {progress.level}</span>
              </div>
              <span>
                {progress.currentXP} / {progress.requiredXP} XP
              </span>
            </div>
            <Progress
              value={(progress.currentXP / progress.requiredXP) * 100}
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Today&apos;s Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                    task.completed ? "bg-gray-50 dark:bg-gray-800" : ""
                  }`}
                >
                  <button onClick={() => completeTask(task.id)} className="mt-1">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${task.completed ? "text-gray-500 line-through" : ""}`}>
                        {task.title}
                      </h3>
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{task.xpReward} XP</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    {task.timestamp && (
                      <p className="text-xs text-gray-400 mt-2">
                        Completed {task.timestamp.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tomorrow's Tasks */}
        <TooltipProvider>
          <Card className={!allTodayTasksCompleted ? "opacity-50" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Tomorrow&apos;s Tasks</span>
                {!allTodayTasksCompleted && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Lock className="w-4 h-4 ml-2 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Complete today&apos;s tasks to unlock tomorrow&apos;s challenges!</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tomorrowTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    <div className="mt-1">
                      <Circle className="w-5 h-5 text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{task.title}</h3>
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{task.xpReward} XP</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default JourneyDashboard;