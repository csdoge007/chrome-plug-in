import Mock from 'mockjs';
import { mockFetch } from 'mockjs-fetch';
mockFetch(Mock);

Mock.mock(/login/, {
  code: 200,
  msg: 'OK',
  data: {
      nickname: '兔子先生',
      accessToken: 'fqh0i-LyINZ-RvK5d-Akj3a-uBYRl',
  }
})

