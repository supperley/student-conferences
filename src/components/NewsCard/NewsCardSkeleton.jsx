import { Card, Skeleton } from '@nextui-org/react';

export const NewsCardSkeleton = () => (
  <Card className="p-2 h-full border-transparent text-start bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]">
    <Skeleton className="w-3/5 rounded-lg my-3">
      <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
    </Skeleton>
    <Skeleton className="rounded-lg mb-3">
      <div className="h-32 rounded-lg bg-default-300"></div>
    </Skeleton>
    <div className="flex justify-between mb-2">
      <Skeleton className="w-2/5 rounded-lg">
        <div className="w-2/5 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="w-1/5 rounded-lg">
        <div className="h-10 w-2/5 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  </Card>
);
