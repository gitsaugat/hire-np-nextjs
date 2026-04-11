import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-primary py-2 px-4 text-white text-center text-sm font-medium">
      <div className="flex items-center justify-center gap-2">
        <span>Automating 90% of hiring workflows with AI</span>
        <button className="flex items-center gap-1 hover:underline decoration-white underline-offset-4">
          Early Access <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
