import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  let random = Math.floor(Math.random() * 100000);

  let res = http.put(`http://localhost:3000/reviews/${random}/helpful`);
  check(res, {
    'is status 204': (r) => r.status === 204,
    'response time < 2000ms': (r) => r.timings.duration < 2000
  })
  sleep(1);
}