import { useNavigate } from "react-router-dom";
import CTAButton from "@/components/CTAButton";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section
      id="notfound"
      className="flex flex-col items-center justify-center px-4 text-center mt-50 flex-grow"
    >
      <h1 className="text-7xl font-extrabold text-white mb-6">404</h1>
      <p className="text-lg text-[#bbb] mb-8 max-w-md">
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        URL을 확인하거나
        <br />
        아래 버튼을 눌러 메인 페이지로 돌아가세요.
      </p>
      <CTAButton onClick={() => navigate("/")}>메인으로 돌아가기</CTAButton>
    </section>
  );
};

export default NotFound;
