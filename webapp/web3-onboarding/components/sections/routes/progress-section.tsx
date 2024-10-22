// webapp/src/features/progress/types.ts
export interface UserProgress {
    currentLevel: number;
    experiencePoints: number;
    streakDays: number;
    lastLoginDate: string;
  }
  
  export interface LearningTask {
    id: string;
    title: string;
    description: string;
    type: 'TUTORIAL' | 'QUIZ' | 'PROJECT';
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    xpReward: number;
    estimatedMinutes: number;
    completedAt?: string;
    dependencies?: string[];
  }
  
  export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  }
  
    export interface ProgressState {
        userProgress: UserProgress;
        tasks: LearningTask[];
        achievements: Achievement[];
    }
  // webapp/src/features/progress/components/ProgressDashboard.tsx
  import React from 'react';
  import { Progress } from '@/components/ui/progress';
  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
  import { useProgress } from '../hooks/useProgress';
  
  export const ProgressDashboard = () => {
    const { userProgress, tasks } = useProgress();
    const completedTasks = tasks.filter((task: { status: string; }) => task.status === 'COMPLETED');
    const progressPercentage = (completedTasks.length / tasks.length) * 100;
  
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="w-full" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {completedTasks.length} of {tasks.length} tasks completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgress.currentLevel}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {userProgress.experiencePoints} XP
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Daily Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgress.streakDays} days</div>
          </CardContent>
        </Card>
      </div>
    );
  };