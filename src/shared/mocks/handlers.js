import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../config/constants';
import { users } from '../data/mockData';

export const handlers = [
  http.get(`${BASE_URL}/api/users`, ({ request }) => {
    return HttpResponse.json(users);
  }),
];
