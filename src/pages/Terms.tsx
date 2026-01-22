const Terms = () => {
  return (
    <>
      <title>이용약관 | Fearless</title>
      <meta
        name="description"
        content="Fearless 서비스 이용약관. 서비스 이용 조건, Riot Games 관련 고지, 면책 조항을 안내합니다."
      />
      <link rel="canonical" href="https://fearless-lab.github.io/terms" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="이용약관 - Fearless" />
      <meta property="og:description" content="Fearless 서비스 이용약관 안내" />
      <meta property="og:url" content="https://fearless-lab.github.io/terms" />

      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-32 text-white">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            이용약관
          </h1>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                제1조 (목적)
              </h2>
              <p>
                본 약관은 Fearless(이하 "서비스")가 제공하는 웹 서비스의 이용
                조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                제2조 (서비스의 내용)
              </h2>
              <p>본 서비스는 다음과 같은 기능을 제공합니다:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>리그 오브 레전드 모의 밴픽 시뮬레이션</li>
                <li>아이템 퀴즈 게임</li>
                <li>반응속도 테스트</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                제3조 (Riot Games 관련 고지)
              </h2>
              <p>
                본 서비스는 Riot Games, Inc.와 제휴하거나 보증받지 않았습니다.
              </p>
              <p className="mt-2">
                League of Legends 및 모든 관련 자산은 Riot Games, Inc.의 상표
                또는 등록 상표입니다.
              </p>
              <p className="mt-2">
                본 서비스에서 사용되는 챔피언 이미지, 아이템 이미지 등은 Riot
                Games의 Data Dragon API를 통해 제공되며, Riot Games의 커뮤니티
                정책에 따라 사용됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                제4조 (이용자의 의무)
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>서비스를 이용함에 있어 관련 법령을 준수해야 합니다.</li>
                <li>
                  다른 이용자의 서비스 이용을 방해하는 행위를 해서는 안 됩니다.
                </li>
                <li>
                  서비스의 안정적 운영을 방해하는 행위를 해서는 안 됩니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                제5조 (면책 조항)
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>
                  본 서비스는 "있는 그대로" 제공되며, 어떠한 명시적 또는 묵시적
                  보증도 하지 않습니다.
                </li>
                <li>
                  서비스 이용으로 인해 발생하는 손해에 대해 책임을 지지
                  않습니다.
                </li>
                <li>
                  서비스에서 제공하는 게임 데이터의 정확성을 보장하지 않습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                제6조 (서비스의 변경 및 중단)
              </h2>
              <p>
                서비스 제공자는 사전 통지 없이 서비스의 내용을 변경하거나
                서비스를 중단할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                제7조 (광고)
              </h2>
              <p>
                본 서비스는 Google AdSense를 통해 광고를 게재할 수 있습니다.
                광고와 관련된 개인정보 처리는 개인정보처리방침을 참조하세요.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                제8조 (약관의 변경)
              </h2>
              <p>
                본 약관은 필요에 따라 변경될 수 있으며, 변경된 약관은 서비스 내
                공지를 통해 효력을 발생합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                제9조 (문의처)
              </h2>
              <p>서비스 이용 관련 문의사항은 아래 이메일로 연락해 주세요:</p>
              <p className="mt-2">
                <a
                  href="mailto:jyk41993@gmail.com"
                  className="text-cyan-400 hover:underline"
                >
                  jyk41993@gmail.com
                </a>
              </p>
            </section>

            <section className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-500">
                본 이용약관은 2025년 1월 22일부터 적용됩니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
