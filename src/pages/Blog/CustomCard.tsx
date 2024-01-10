import { Card, Skeleton } from '@nextui-org/react';

export const CustomCard = () => (
  <Card className="p-2 h-full border-transparent text-start bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-default-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">
        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  </Card>
);
