import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';

export const SearchField = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <Input type="text" placeholder={placeholder} value={value} onChange={onChange} className="w-full" />;
};
