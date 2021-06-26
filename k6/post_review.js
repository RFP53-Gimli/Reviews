import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  var url = 'http://localhost:3000/reviews';
  var randomProduct = Math.floor(Math.random() * 1000000);
  var body = JSON.stringify({
      "product_id": randomProduct,
      "rating": 3,
      "summary": "Test summary",
      "body": "testsfd sofsikdnaksod paosdjfaksdlf iouaondmfsl",
      "recommend": true,
      "name": "b.o.b",
      "email": "email@email.com",
      "photos": ["urltest", "anotherTestURL"],
      "characteristics": {
          "14": 5,
          "15": 4
      }
  });
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post(url, body, params);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000
  })
  sleep(1);
}