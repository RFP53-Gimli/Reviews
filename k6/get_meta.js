import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  let random = Math.floor(Math.random() * 1000000);
  let res = http.get(`http://localhost:3000/reviews/meta?product_id=${random}`);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000
  })
  sleep(1);
}