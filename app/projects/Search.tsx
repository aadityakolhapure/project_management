import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Updated button styles with violet theme that works in both light and dark modes
const violetBtnStyles = "bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 dark:text-white";

interface SearchAndButtonProps {
  placeholderText: string;
  onSearch?: (term: string) => void;
}

const SearchAndButton = ({
  placeholderText,
  onSearch,
}: SearchAndButtonProps) => {
  return (
    <div className="flex items-center py-4">
      <div className="flex-grow mr-2">
        <Input
          type="text"
          placeholder={placeholderText}
          className="w-full p-2 rounded border-gray-300 dark:border-gray-700 focus:ring-violet-500 focus:border-violet-500 dark:focus:ring-violet-400 dark:focus:border-violet-400 dark:bg-gray-800 dark:text-gray-100"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      <Link href="/new-project">
        <Button className={cn(violetBtnStyles, 'h-9 font-medium')}>
          <Plus className="w-4 h-4 mr-2" />
          New project
        </Button>
      </Link>
    </div>
  );
};

export default SearchAndButton;