import { AppHeader } from '@/components/layout/AppHeader';
import ThreeDeeView from '@/components/motor-twin/ThreeDeeView';
import { DataDashboard } from '@/components/motor-twin/DataDashboard';
import { Separator } from '@/components/ui/separator';

export default function MotorTwinPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-grow flex flex-col md:flex-row md:overflow-hidden overflow-y-auto">
        {/* 3D View Pane */}
        <div className="flex flex-col md:w-1/2 lg:w-3/5 md:h-full">
          <ThreeDeeView />
        </div>

        <Separator orientation="vertical" className="hidden md:block mx-0" />
        <Separator orientation="horizontal" className="block md:hidden my-4" />

        {/* Data Dashboard Pane */}
        <div className="md:w-1/2 lg:w-2/5 md:h-full md:overflow-y-auto">
          <DataDashboard />
        </div>
      </main>
      <footer className="p-2 border-t border-border text-center text-xs text-muted-foreground">
        MotorTwin Digital Interface &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
