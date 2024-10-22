import { MilestoneRewards } from "@/components/sections/learning/milestone-section";
import { LearningPathOverview } from "@/components/sections/learning/path-section";
import { TipOfTheDay } from "@/components/sections/learning/tips-section";
import JourneyDashboard from "@/components/sections/routes/journey-section";

export default function JourneyPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-6">
      {/* Journey Dashboard */}
      <JourneyDashboard />
      {/* Learning Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TipOfTheDay />
        <LearningPathOverview />
        <MilestoneRewards />
      </div>
    </div>
  );
}
