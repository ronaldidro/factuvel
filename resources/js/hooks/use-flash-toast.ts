import { toast } from '@/components/ui/sonner';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export const useFlashToast = () => {
  const { flash } = usePage<SharedData>().props;

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
  }, [flash]);
};
