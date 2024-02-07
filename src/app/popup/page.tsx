import Logo from '../../../public/svg/Logo';

export default function Home() {
  return (
    <div className="flex flex-col items-start gap-5 py-10 px-5">
      <Logo />
      <p className="t1-bold text-gray-dark-active">폼플렛 서비스 종료 안내</p>
      <p className="b1 text-gray-dark-active">안녕하세요, 폼플렛입니다.</p>
      <div className="flex flex-col gap-2">
        <p className="b1 text-gray-dark-active">
          2024년 2월 29일에 서비스가 종료됨을 알려드립니다.
        </p>
        <p className="b1 text-gray-dark-active">*서비스 제공일 : 2024년 2월 29일까지</p>
        <p className="b1 text-gray-dark-active">
          *서비스 이용을 위해 수집된 정보는 서비스 종료 후 파기되며, 일부 개인정보는 폼플렛 개인
          정보 처리 방침에 따라 1년동안 보관 후 파기될 예정입니다.
        </p>
        <p className="b1 text-gray-dark-active">
          *서비스가 종료된 이후에는 배포하셨던 페이지를 포함, 수집하셨던 응답 데이터를 조회하기
          어려우시니 CSV 파일로 미리 다운로드 받으시기 바랍니다.
        </p>
        <p className="b1 text-gray-dark-active">지금까지 폼플렛을 이용해주셔서 감사합니다.</p>
      </div>
    </div>
  );
}
