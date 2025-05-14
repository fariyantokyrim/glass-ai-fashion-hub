
import React from 'react';
import { Camera } from 'lucide-react';
import { AspectRatio } from './aspect-ratio';
import { cn } from '@/lib/utils';

type VirtualTryPreviewProps = {
  categoryType?: string;
  filter?: string;
  className?: string;
  showLabel?: boolean;
};

export function VirtualTryPreview({
  categoryType = 'fashion',
  filter = '',
  className = '',
  showLabel = true,
}: VirtualTryPreviewProps) {
  let labelText = 'Try on virtual items';
  
  if (filter) {
    if (categoryType === 'fashion') labelText = 'Try on virtual clothing - Filter: ' + filter;
    if (categoryType === 'cosmetics') labelText = 'Try on virtual makeup - Filter: ' + filter;
    if (categoryType === 'accessories') labelText = 'Try on virtual accessories - Filter: ' + filter;
  }
  
  return (
    <div className={cn("w-full rounded-2xl overflow-hidden relative bg-gray-100", className)}>
      <AspectRatio ratio={1/1}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-2 border-dashed border-gray-300 rounded-full w-2/3 h-2/3 md:w-1/2 md:h-1/2 flex items-center justify-center">
            <div className="w-3/4 h-3/4 bg-gray-200 rounded-full flex items-center justify-center">
              <Camera size={32} className="text-gray-400" />
            </div>
          </div>
        </div>
        {showLabel && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-3">
            {labelText}
          </div>
        )}
      </AspectRatio>
    </div>
  );
}
