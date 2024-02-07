export default function EmptyDataList() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 ">
      <p className="h3 text-gray-normal-active">확인할 수 있는 데이터가 없습니다</p>
      <div className="flex flex-col justify-center items-center">
        <p className="b1 text-gray-normal-normal">아직 웹페이지에 추가된 폼이 없어요! </p>
        <p className="b1 text-gray-normal-normal">
          나의 웹페이지 편집에서 폼을 추가하고 응답을 받아보세요.
        </p>
      </div>
    </div>
  );
}
