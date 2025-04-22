import { Review } from '@/types/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates and returns a human-readable time difference between a given date and now
 * @param dateString - A string representing a date (ISO format or Date.parse compatible)
 * @returns A string describing the time difference (e.g., "5 minutes ago", "3 days ago")
 */
export const getTimeDifference = (dateString: string | Date): string => {
  // Handle both string and Date inputs
  const date =
    typeof dateString === 'string' ? new Date(dateString) : dateString;
  const now = new Date();

  // Validate the date
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided to getTimeDifference');
  }

  // Calculate difference in milliseconds
  const diffInMs = now.getTime() - date.getTime();

  // Handle future dates (shouldn't happen but good to handle)
  if (diffInMs < 0) {
    return 'just now';
  }

  // Convert to different units
  const diffInSeconds = Math.round(diffInMs / 1000);
  const diffInMinutes = Math.round(diffInMs / (1000 * 60));
  const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.round(diffInDays / 7);
  const diffInMonths = Math.round(diffInDays / 30);
  const diffInYears = Math.round(diffInDays / 365);

  // Return the most appropriate unit
  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  }
};
export const substring = (string: string, charCount: number) => {
  return string?.length > charCount
    ? `${string?.substring(0, charCount)}...`
    : string;
};

export const maskName = (name: string) => {
  if (!name || name.length <= 3) return name;
  const visible = name.substring(0, 3);
  const masked = '*'.repeat(name.length - 3);
  return visible + masked;
};

export const getReviewsAverageMarkup = (
  reviews: Review[],
  showLongVersion: boolean
) => {
  if (!reviews.length) return;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const totalReviews = reviews.length;
  if (showLongVersion) {
    return `${totalRating} / ${totalReviews * 5} Based On ${totalReviews} ${
      totalReviews > 1 ? 'Reviews' : 'Review'
    }`;
  } else {
    return `Avg Rating: ${totalRating} / ${reviews.length * 5}`;
  }
};

// utils/refreshDashboard.ts
export const triggerDashboardRefresh = () => {
  window.dispatchEvent(new Event('dashboardRefresh'));
};
