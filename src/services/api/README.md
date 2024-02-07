## API 정책

- JWT (JSON Web Token)
- Access Token, Refresh Token
- `getAccessToken` (./service/api/auth/AuthReissue.ts)
  - 쿠키에 저장된 Refresh Token이 해당 도메인에 루트 패스로 설정되어있기 때문에 기본적으로 요청시에 담겨져서 보내지기 때문에 해당 Refresh Token을 가지고 Access Token을 재발급 한다.
  - Instance 내부에서는 dependency detect cycle 이슈로 내부에서 새로 사용
- `Slient Refresh`
  - Access Token의 생명주기가 짧기 때문에(백엔드 로직에 5분으로 작성) 로그인 시 Callback으로 1분 전에 Reissue를 통해 Access Token, Refresh Token 재발급

### Axios Interceptor

- Axios API Interceptor를 사용해서 401에러가 반환될 때 에러 메세지를 확인하여 인증기간이 만료된 경우 Access Token 재발급 받고, 기존 Request를 재요청 보내기
  - Access Token이 만료되었는데 재발급 받는 과정에서 요청이 중복되어 보내질 때 race condition이 발생할 수 있다. 그렇게 될 경우 클라이언트 요청은 두 개이지만 서버는 요청을 하나씩 처리하기 때문에 순서대로 클라이언트에 도착한다는 보장이 없기 때문에 요청이 거절될 수 있다. 따라서 이 문제를 방지하고자 뮤택스와 큐를 적용하여 재발급 요청을 처리하고 있다면 배열에 기존 요청을 넣어뒀다가 완료되면 담아둔 요청을 순서대로 처리한다.
- Access Token이 오염된 경우 reject
