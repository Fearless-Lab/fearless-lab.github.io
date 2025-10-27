export function convertTypeToKo(type: string): string {
  switch (type) {
    case "pick":
      return "챔피언 선택";
    case "ban":
      return "챔피언 금지";
    case "swap":
      return "드래그로 순서를 정한 뒤, 버튼을 눌러 확정해주세요";
    default:
      return "대기 중";
  }
}
