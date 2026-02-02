'use client';

import { Shield, Lock, CheckCircle2 } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    text: 'Secure Platform',
  },
  {
    icon: Lock,
    text: 'SSL Encrypted',
  },
  {
    icon: CheckCircle2,
    text: 'Free to Use',
  },
];

export default function TrustBadges() {
  return (
    <div className='flex flex-wrap items-center justify-center gap-6 md:gap-8 py-8'>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Icon className='w-4 h-4' />
            <span>{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
}
