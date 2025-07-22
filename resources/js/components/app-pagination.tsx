import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Pagination } from '@/types';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';

interface AppPaginationProps extends Pagination {
  onPerPageChange: (perPage: string) => void;
  onPageChange: (url: string | null) => void;
  hide: boolean;
}

export const AppPagination = ({ meta, links, onPageChange, onPerPageChange, hide }: AppPaginationProps) => {
  if (hide) return null;

  return (
    <nav className="flex items-center justify-center space-x-4 md:justify-start md:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="hidden text-sm md:inline-flex">Rows per page</p>
        <Select value={meta.per_page.toString()} onValueChange={(value) => onPerPageChange(value)}>
          <SelectTrigger className="w-[60px]">
            <SelectValue placeholder={meta.per_page} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm">
        Page {meta.current_page} of {meta.last_page}
      </p>
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={() => onPageChange(links.first)} disabled={meta.current_page === 1}>
          <ChevronFirst />
        </Button>
        <Button variant="outline" onClick={() => onPageChange(links.prev)} disabled={!links.prev}>
          <ChevronLeft />
        </Button>
        <Button variant="outline" onClick={() => onPageChange(links.next)} disabled={!links.next}>
          <ChevronRight />
        </Button>
        <Button variant="outline" onClick={() => onPageChange(links.last)} disabled={meta.current_page === meta.last_page}>
          <ChevronLast />
        </Button>
      </div>
    </nav>
  );
};
