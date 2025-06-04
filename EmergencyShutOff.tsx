"use client";

import { useState } from 'react';
import { PowerOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
// import { emergencyShutOff as shutOffAction } from '@/app/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const EmergencyShutOff: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShutOff = () => {
    setIsSubmitting(true);
    try {
      // const result = await shutOffAction();
      // if (result.success) {
      //   toast({
      //     title: "Success",
      //     description: result.message,
      //   });
      // } else {
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description: result.message || "Failed to send shut-off signal.",
      //   });
      // }
      toast({
        title: 'Feature Disabled',
        description:
          'Emergency shut-off is not available in this front-end only mode.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full py-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-shadow" disabled={isSubmitting}>
          <AlertTriangle className="mr-2 h-6 w-6" />
          EMERGENCY SHUT OFF
          <PowerOff className="ml-2 h-6 w-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Emergency Shut Off</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to shut off the real motor? This action is critical and should only be used in emergencies.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleShutOff} disabled={isSubmitting} className="bg-destructive hover:bg-destructive/90">
            {isSubmitting ? "Processing..." : "Confirm Shut Off"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
