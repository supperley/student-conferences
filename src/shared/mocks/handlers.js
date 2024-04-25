import { HttpResponse, http } from 'msw';
import { BASE_URL } from '../config/constants';
import { conferences, user, users } from '../data/mockData';

export const handlers = [
  http.get(`${BASE_URL}/api/users`, () => {
    return HttpResponse.json(users);
  }),
  http.get(`${BASE_URL}/api/users/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json(users[id - 1]);
  }),
  http.post(`${BASE_URL}/api/auth/login`, () => {
    return HttpResponse.json(user);
  }),
  http.get(`${BASE_URL}/api/conferences`, () => {
    return HttpResponse.json(conferences);
  }),
];
