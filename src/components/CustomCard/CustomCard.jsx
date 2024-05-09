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
import { S3_URL } from '../../shared/config/constants';
import { useNavigate } from 'react-router-dom';
import defaultReport from '../../shared/assets/images/default-report.jpg';
import { facultiesDataMap } from '../../shared/data/dataMap';
import { chipDataMap } from '../../shared/data/dataMap';

export const CustomCard = ({ data }) => {
  const isLoaded = true;
  const navigate = useNavigate();

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
              className="w-full p-2 h-full border-transparent text-start bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]"
              isPressable
              onPress={() => {
                navigate('/news/' + data?._id);
              }}>
              <CardHeader className="flex justify-between">
                <Link
                  className="font-semibold "
                  href={'/news/' + data?._id}
                  size="lg"
                  underline="hover">
                  {data.title}
                </Link>
                {data?.chip && (
                  <Chip color={chipDataMap[data.chip]?.color} variant="flat">
                    {chipDataMap[data.chip]?.name || data.chip}
                  </Chip>
                )}
              </CardHeader>
              <CardBody className="pt-0 px-2 pb-1 justify-center">
                <div className="self-center">
                  <Image
                    src={data?.imageUrl ? S3_URL + data?.imageUrl : defaultReport}
                    className="max-h-48"
                  />
                </div>
                <div className="flex flex-row gap-2 mt-4">
                  {data?.faculties &&
                    data?.faculties
                      .slice(0, 2)
                      .map((faculty) => <Chip>{facultiesDataMap[faculty]?.label || faculty}</Chip>)}
                  {data?.faculties?.length > 2 && 'и более'}
                </div>
              </CardBody>
              <CardFooter className="flex justify-between items-center">
                <time className="block text-small text-default-500" dateTime={data?.createdAt}>
                  {format(parseISO(data?.createdAt), 'LLLL d, yyyy')}
                </time>
                <Avatar size="sm" src={S3_URL + data.author?.avatarUrl} />
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
