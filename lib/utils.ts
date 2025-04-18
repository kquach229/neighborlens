import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeDifference = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  // Calculate difference in milliseconds
  const diffInMs = now.getTime() - date.getTime();

  // Convert to different units
  const diffInMinutes = Math.round(diffInMs / (1000 * 60));
  const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''}`;
  } else {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''}`;
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
