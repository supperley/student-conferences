import {
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Link,
  Avatar,
  Image,
  Chip,
} from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CustomCardSkeleton } from './CustomCardSkeleton';
import { format, parseISO } from 'date-fns';

export const CustomCard = (data) => {
  const isLoaded = true;

  const handlePress = () => {
    // trackEvent('BlogPostCard - Selection', {
    //   name: post.title,
    //   action: 'click',
    //   category: 'blog',
    //   data: post.url ?? '',
    // });
  };

  return (
    <AnimatePresence>
      {
        <motion.article
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          initial={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.3 }}>
          {isLoaded ? (
            <Card
              isBlurred
              // as={NextLink}
              className="p-2 h-full border-transparent text-start bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]"
              isPressable={!!data.url}
              onPress={handlePress}>
              <CardHeader className="flex justify-between">
                <Link
                  // as={NextLink}
                  className="font-semibold "
                  href={data.url}
                  size="lg"
                  underline="hover"
                  onPress={handlePress}>
                  {data.title}
                </Link>
                {data?.status && <Chip color="success">{data?.status}</Chip>}
              </CardHeader>
              <CardBody className="pt-0 px-2 pb-1">
                <Image src={data.image} />
                {data?.tags && data?.tags[0] && <Chip className="mt-4 mb-3">{data?.tags[0]}</Chip>}
                <p className="font-normal w-full text-default-600">{data.description}</p>
              </CardBody>
              <CardFooter className="flex justify-between items-center">
                <time className="block text-small text-default-500" dateTime={data.date}>
                  {format(parseISO(data.date), 'LLLL d, yyyy')}
                </time>
                <Avatar size="sm" src={data.author?.avatar} />
              </CardFooter>
            </Card>
          ) : (
            <CustomCardSkeleton />
          )}
        </motion.article>
      }
    </AnimatePresence>
  );
};
