'use client';

import React from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, MessageSquare, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- Type Definition ---
export interface ReportPost {
  id: string;
  category: 'pothole' | 'streetlight' | 'drainage' | 'waste' | 'graffiti' | 'broken_sidewalk';
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: string;
  imageUrl: string | null;
  author: {
    name: string | null;
    imageUrl: string | null;
  };
  likes: {
    userId: string;
  }[];
  // ✅ ADDED: A boolean to know if the current user has liked this post
  userHasLiked?: boolean;
}

interface UserPostCardProps {
  post: ReportPost;
  // ✅ ADDED: A function to handle the like button click, passed from the parent
  onToggleLike: () => void;
}

// --- Helper Function for Status Styling ---
const getStatusStyles = (status: ReportPost['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'resolved':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// --- Main Component ---
export default function UserPostCard({ post, onToggleLike }: UserPostCardProps) {
  const authorAvatar = post.author.imageUrl || `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${post.author.name || 'anonymous'}`;
  
  const handleLikeClick = (e: React.MouseEvent) => {
    // Prevent the entire card from navigating if it's wrapped in a Link
    e.preventDefault(); 
    onToggleLike();
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-xl border border-gray-200/80">
      {/* Post Header */}
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Image
          src={authorAvatar}
          alt={post.author.name || 'User Avatar'}
          width={40}
          height={40}
          className="rounded-full bg-gray-200 border-2 border-white shadow"
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{post.author.name || 'Anonymous User'}</p>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </CardHeader>
      
      {/* Post Image */}
      {post.imageUrl && (
        <div className="relative h-60 w-full">
          <Image
            src={post.imageUrl}
            alt={post.description}
            fill={true}
            style={{objectFit:"cover"}}
            className="bg-gray-200"
          />
        </div>
      )}

      {/* Post Content */}
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 capitalize">
                {post.category.replace(/_/g, ' ')}
            </h3>
            <Badge className={cn('text-xs font-bold', getStatusStyles(post.status))}>
                {post.status.replace(/_/g, ' ').toUpperCase()}
            </Badge>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">
          {post.description}
        </p>
      </CardContent>

      {/* Post Footer with Actions */}
      <CardFooter className="flex justify-between items-center bg-gray-50/70 p-3 border-t">
        <div className="flex items-center gap-5 text-gray-500">
          {/* ✅ UPDATED: The like button is now fully interactive */}
          <button 
            onClick={handleLikeClick}
            className={cn(
              "flex items-center gap-1.5 hover:text-blue-600 transition-colors",
              post.userHasLiked && "text-blue-600 font-semibold"
            )}
          >
            <ThumbsUp size={16} />
            <span className="text-sm">{post.likes.length}</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
            <MessageSquare size={16} />
            <span className="text-sm">0</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

