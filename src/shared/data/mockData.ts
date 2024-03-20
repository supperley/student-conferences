const profile = {
  description: 'profile description',
  name: 'Ivanov Ivan',
  date: '2022-08-12T20:17:46.384Z',
  email: 'test@test.com',
  avatar: 'https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg',
};

const users = [
  {
    id: 1,
    name: 'Юрий Полозков',
    role: 'Заведующий кафедры',
    team: 'ПОИСиТ',
    status: 'active',
    age: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Tech Lead',
    team: 'Development',
    status: 'paused',
    age: '25',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Ирина Тетерюкова',
    role: 'Ст. преподаватель',
    team: 'ПОИСиТ',
    status: 'active',
    age: '22',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    name: 'Сергей Станкевич',
    role: 'Преподаватель',
    team: 'ПОИСиТ',
    status: 'vacation',
    age: '28',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'Студент',
    team: 'ПОИСиТ',
    status: 'active',
    age: '24',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
  {
    id: 6,
    name: 'Brian Kim',
    role: 'P. Manager',
    team: 'Management',
    age: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'brian.kim@example.com',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Michael Hunt',
    role: 'Designer',
    team: 'Design',
    status: 'paused',
    age: '27',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29027007d',
    email: 'michael.hunt@example.com',
  },
  {
    id: 8,
    name: 'Samantha Brooks',
    role: 'HR Manager',
    team: 'HR',
    status: 'active',
    age: '31',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e27027008d',
    email: 'samantha.brooks@example.com',
  },
  {
    id: 9,
    name: 'Frank Harrison',
    role: 'F. Manager',
    team: 'Finance',
    status: 'vacation',
    age: '33',
    avatar: 'https://i.pravatar.cc/150?img=4',
    email: 'frank.harrison@example.com',
  },
  {
    id: 10,
    name: 'Emma Adams',
    role: 'Ops Manager',
    team: 'Operations',
    status: 'active',
    age: '35',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'emma.adams@example.com',
  },
  {
    id: 11,
    name: 'Brandon Stevens',
    role: 'Jr. Dev',
    team: 'Development',
    status: 'active',
    age: '22',
    avatar: 'https://i.pravatar.cc/150?img=8',
    email: 'brandon.stevens@example.com',
  },
  {
    id: 12,
    name: 'Megan Richards',
    role: 'P. Manager',
    team: 'Product',
    status: 'paused',
    age: '28',
    avatar: 'https://i.pravatar.cc/150?img=10',
    email: 'megan.richards@example.com',
  },
  {
    id: 13,
    name: 'Oliver Scott',
    role: 'S. Manager',
    team: 'Security',
    status: 'active',
    age: '37',
    avatar: 'https://i.pravatar.cc/150?img=12',
    email: 'oliver.scott@example.com',
  },
  {
    id: 14,
    name: 'Grace Allen',
    role: 'M. Specialist',
    team: 'Marketing',
    status: 'active',
    age: '30',
    avatar: 'https://i.pravatar.cc/150?img=16',
    email: 'grace.allen@example.com',
  },
  {
    id: 15,
    name: 'Noah Carter',
    role: 'IT Specialist',
    team: 'I. Technology',
    status: 'paused',
    age: '31',
    avatar: 'https://i.pravatar.cc/150?img=15',
    email: 'noah.carter@example.com',
  },
  {
    id: 16,
    name: 'Ava Perez',
    role: 'Manager',
    team: 'Sales',
    status: 'active',
    age: '29',
    avatar: 'https://i.pravatar.cc/150?img=20',
    email: 'ava.perez@example.com',
  },
  {
    id: 17,
    name: 'Liam Johnson',
    role: 'Data Analyst',
    team: 'Analysis',
    status: 'active',
    age: '28',
    avatar: 'https://i.pravatar.cc/150?img=33',
    email: 'liam.johnson@example.com',
  },
  {
    id: 18,
    name: 'Sophia Taylor',
    role: 'QA Analyst',
    team: 'Testing',
    status: 'active',
    age: '27',
    avatar: 'https://i.pravatar.cc/150?img=29',
    email: 'sophia.taylor@example.com',
  },
  {
    id: 19,
    name: 'Lucas Harris',
    role: 'Administrator',
    team: 'Information Technology',
    status: 'paused',
    age: '32',
    avatar: 'https://i.pravatar.cc/150?img=50',
    email: 'lucas.harris@example.com',
  },
  {
    id: 20,
    name: 'Mia Robinson',
    role: 'Coordinator',
    team: 'Operations',
    status: 'active',
    age: '26',
    avatar: 'https://i.pravatar.cc/150?img=45',
    email: 'mia.robinson@example.com',
  },
];

const conferences = [
  {
    id: 1,
    title: 'Конференция v2.2.0 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    tags: ['ФИТР'],
    administrator: { id: 1, name: 'Юрий Полозков' },
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/conference/1',
    status: 'completed',
    faculty: 'ФИТР',
    link: 'https://meet.google.com',
  },
  {
    id: 2,
    title: 'Конференция v2.2.1 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    tags: ['ФММП'],
    administrator: { id: 1, name: 'Юрий Полозков' },
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/conference/2',
    status: 'registrationClosed',
    faculty: 'ФИТР',
  },
  {
    id: 3,
    title: 'Конференция v2.2.2 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    tags: ['Test'],
    administrator: { id: 1, name: 'Юрий Полозков' },
    faculty: 'ФИТР',
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/conference/3',
    status: 'registrationOpen',
  },
  {
    id: 4,
    title: 'Конференция v2.2.3 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    tags: ['Test'],
    administrator: { id: 1, name: 'Юрий Полозков' },
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/conference/3',
    status: 'declined',
    faculty: 'ФИТР',
  },
];

const userReports = [
  {
    id: 1,
    title: 'Расчет погрешностей',
    description: 'test',
    conference: { id: 1, name: '77-я студенческая конференция' },
    author: { id: 1, name: 'Юрий Полозков' },
    faculty: 'ПОИСиТ',
    status: 'pending',
    date: '2022-08-12T20:17:46.384Z',
    link: 'https://google.com',
    thumb: 'https://nextui.org/blog/v2.2.0.jpg',
  },
];

const faculties = [
  { label: 'ФИТР', value: 'fitr' },
  { label: 'ФММП', value: 'fmmp' },
];

const news = [
  {
    title: 'Новость v2.2.0 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    author: 'Test',
    tags: ['ФММП'],
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/news/1',
  },
  {
    title: 'Новость v2.2.1 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    author: 'Test',
    tags: ['Test'],
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/news/2',
  },
  {
    chip: 'conference',
    title: 'Новость v2.2.2 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    author: 'Test',
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/news/3',
    tags: ['ФИТР'],
  },
  {
    chip: 'conference',
    title: 'Новость v2.2.2 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    author: 'Test',
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/news/3',
    tags: ['ФИТР'],
  },
  {
    chip: 'conference',
    title: 'Новость v2.2.2 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    author: 'Test',
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/news/3',
    tags: ['ФИТР'],
  },
  {
    chip: 'conference',
    title: 'Новость v2.2.2 🚀',
    description:
      'NextUI v2.2.0 is here! Dive into client-side router support, discover 3 new components including the Autocomplete, and more.',
    date: '2022-08-12T20:17:46.384Z',
    author: 'Test',
    image: 'https://nextui.org/blog/v2.2.0.jpg',
    url: '/news/3',
    tags: ['ФИТР'],
  },
];

const newsStatus = [
  { label: 'Конференция', value: 'conference' },
  { label: 'Уведомление', value: 'notification' },
];

export { userReports, conferences, users, news, faculties, profile, newsStatus };
