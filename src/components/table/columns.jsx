import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
export const columns = [
  {
    header: 'Actions',
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const channel = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                table.options.meta.onSearching(channel.id, channel.title)
              }
            >
              Check sentiments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: 'title',
    header: 'Title',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className='truncate max-w-[450px]'>{row.getValue('title')}</div>
      );
    },
  },

  {
    accessorKey: 'views',
    header: 'Views',
    cell: ({ row }) => {
      return row.getValue('views').toLocaleString('en-IN');
    },
  },
  {
    accessorKey: 'likes',
    header: 'Likes',
    cell: ({ row }) => {
      return row.getValue('likes').toLocaleString('en-IN');
    },
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
    cell: ({ row }) => {
      return row.getValue('comments').toLocaleString('en-IN');
    },
  },
  {
    accessorKey: 'published',
    header: 'Upload Date',
    cell: ({ row }) => {
      return (
        <div className='truncate'>
          {format(new Date(row.getValue('published')), 'PPP')}
        </div>
      );
    },
  },
];
