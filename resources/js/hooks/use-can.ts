import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function useCan() {
  const { auth } = usePage<SharedData>().props;

  const can = (permission: string) => auth.permissions.includes(permission);

  return { can };
}
