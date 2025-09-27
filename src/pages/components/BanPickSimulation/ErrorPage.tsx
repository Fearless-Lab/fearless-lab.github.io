import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <ExclamationTriangleIcon className="w-12 h-12 text-rose-500 mb-4" />
      <h1 className="text-xl font-semibold mb-2">잘못된 접근입니다</h1>
      <p className="text-gray-400 text-sm text-center max-w-md">
        방 정보가 올바르지 않거나, 존재하지 않는 경기입니다.
        <br />
        올바른 링크를 다시 확인해주세요.
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded text-sm font-medium transition"
      >
        홈으로 돌아가기
      </a>
    </div>
  );
};

export default ErrorPage;
