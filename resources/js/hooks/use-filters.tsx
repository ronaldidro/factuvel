import { router } from '@inertiajs/react';
import { useState } from 'react';

export const useFilters = <T extends Record<string, string>>(initial: T, routeName: string) => {
  const [filters, setFilters] = useState<T>(initial);

  const updateFilter = (key: string, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    router.get(route(routeName), updated, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  return { filters, updateFilter };
};
