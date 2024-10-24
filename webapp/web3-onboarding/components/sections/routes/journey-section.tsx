'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Trophy, 
  Flame, 
  Star, 
  Lock,
  Calendar,
  BookOpen
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import type { Chapter, Lesson } from "@/types/types";

interface UserProgress {
  level: number;
  currentXP: number;
  requiredXP: number;
  streak: number;
  lastCompleted?: Date;
}

interface JourneyDashboardProps {
  initialChapters: Chapter[];
  initialLessons: {
    [key: string]: Lesson[]; // chapterId -> lessons
  };
}

const JourneyDashboard = ({ initialChapters, initialLessons }: JourneyDashboardProps) => {
  const [progress, setProgress] = useState<UserProgress>({
    level: 1,
    currentXP: 0,
    requiredXP: 200,
    streak: 3,
  });

  const todayChapter = initialChapters.find(chapter => chapter.status === 'available' || chapter.status === 'in_progress');
  const nextChapter = initialChapters.find(chapter => chapter.status === 'locked');
  
  const todayLessons = todayChapter ? initialLessons[todayChapter.slug] : [];
  const nextLessons = nextChapter ? initialLessons[nextChapter.slug] : [];

  const allTodayLessonsCompleted = todayLessons.every(lesson => lesson.status === 'completed');

  const calculateTotalXP = () => {
    let total = 0;
    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.values(initialLessons).forEach(chapterLessons => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      chapterLessons.forEach(lesson => {
        if (lesson.status === 'completed') {
          total += lesson.xpReward;
        }
      });
    });
    return total;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const totalXP = calculateTotalXP();
    setProgress(prev => ({
      ...prev,
      currentXP: totalXP,
      level: Math.floor(totalXP / prev.requiredXP) + 1,
    }));
  }, [initialLessons]);

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

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Chapter Lessons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>{todayChapter?.title || "Get Started"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/journey/chapters/${todayChapter?.slug}/${lesson.slug}`}
                >
                  <div
                    className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      lesson.status === 'completed' ? "bg-gray-50 dark:bg-gray-800" : ""
                    }`}
                  >
                    <div className="mt-1">
                      {lesson.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${lesson.status === 'completed' ? "text-gray-500" : ""}`}>
                          {lesson.title}
                        </h3>
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{lesson.xpReward} XP</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                      {lesson.status === 'in_progress' && (
                        <Badge variant="secondary" className="mt-2">In Progress</Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Chapter Preview */}
        <TooltipProvider>
          <Card className={!allTodayLessonsCompleted ? "opacity-50" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{nextChapter?.title || "Coming Soon"}</span>
                {!allTodayLessonsCompleted && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Lock className="w-4 h-4 ml-2 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Complete current chapter to unlock next challenges!</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nextLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    <div className="mt-1">
                      <Lock className="w-5 h-5 text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{lesson.title}</h3>
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{lesson.xpReward} XP</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
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