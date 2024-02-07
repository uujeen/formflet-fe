import ExclaimCircle from '../../../../public/svg/ExclaimCircle';

export default function EditFormExample() {
  const formExample = [
    '[텍스트] : 질문이나 응답이 아닌 일반 텍스트 블럭이 생성돼요.',
    '[질문] : 질문 블럭이 생성돼요.',
    '[질문_*] : 필수 응답으로 설정된 질문 블럭이 생성돼요.',
    '[주관식] : 주관식 응답 블럭이 생성돼요. ‘[주관식]’을 작성하고 한 칸 띄운 후 작성한 텍스트는 응답 필드 안에 예시 응답으로 들어가요.',
    '[객관식] : 객관식 응답 블럭이 생성돼요. ‘[객관식]’을 작성하고 한 칸 띄운 후 객관식 선택지를 입력하고, 각 선택지의 구분은 ‘_’로 해요.',
    '[객관식_복수] : 복수 선택이 가능한 객관식 응답 블럭이 생성돼요. ‘[객관식_복수]’를 작성하고 한 칸 띄운 후 객관식 선택지를 입력하고, 각 선택지의 구분은 ‘_’로 해요.',
    '[파일] : pdf 파일을 제출할 수 있는 블럭이 생성돼요.',
  ];

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-1">
        <ExclaimCircle color="#9fa0a0" />
        <p className="b2-bold text-gray-normal-normal">폼 생성 가이드</p>
      </div>
      <p className="b2 text-gray-normal-normal">
        아래 옵션 중 하나를 입력하여 블럭을 생성하고, 이후 스페이스 한 칸을 띄우고 각 블럭 안에
        표시될 내용을 작성해주세요.
      </p>
      <p className="b2 text-gray-normal-normal">
        가이드에 따라 작성하면, 생성된 폼을 오른쪽 미리보기 창에서 미리 볼 수 있어요.
      </p>
      {formExample.map((item) => (
        <li className="leading-normal b2 text-gray-normal-normal">{item}</li>
      ))}
      <p className="b2 text-gray-normal-normal">
        질문 블럭을 생성하면 꼭! 다음 줄에 응답 블럭도 생성해주세요!!
      </p>
    </div>
  );
}
