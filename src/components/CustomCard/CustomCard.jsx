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
import { faculties, facultiesDataMap } from '../../shared/data/dataMap';
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
              //as={NextLink}
              className="w-full p-2 h-full border-transparent text-start bg-white/5 dark:bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]"
              isPressable
              onPress={() => {
                navigate('/news/' + data?._id);
              }}>
              <CardHeader className="flex justify-between">
                <Link
                  // as={NextLink}
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
                <Image src={data?.imageUrl ? S3_URL + data?.imageUrl : defaultReport} />
                {data?.faculties && data?.faculties[0] && (
                  <Chip className="mt-4">
                    {facultiesDataMap[data?.faculties[0]]?.label || data?.faculties[0]}
                  </Chip>
                )}
                {/* <p className="mt-3 font-normal w-full text-default-600">{data.description}</p> */}
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
