import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  let random = Math.floor(Math.random() * 1000000);
  let res = http.get(`http://localhost:3000/reviews?product_id=${random}&count=5&sort=helpfulness&page=1`);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000
  })
  sleep(1);
}