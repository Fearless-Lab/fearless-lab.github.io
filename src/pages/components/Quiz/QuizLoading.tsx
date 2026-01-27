const QuizLoading = () => {
  return (
    <div className="max-w-md w-full min-h-[380px] bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20 flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      <p className="text-sm text-white/60">아이템 불러오는 중...</p>
    </div>
  );
};

export default QuizLoading;
