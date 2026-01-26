import AdSection from "@/components/AdSection";

const Privacy = () => {
  return (
    <>
      <title>개인정보처리방침 | Fearless</title>
      <meta
        name="description"
        content="Fearless 개인정보처리방침. Google Analytics, 카카오 애드핏 사용 및 쿠키 정책에 대해 안내합니다."
      />
      <link rel="canonical" href="https://fearless-lab.github.io/privacy" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="개인정보처리방침 - Fearless" />
      <meta
        property="og:description"
        content="Fearless 개인정보처리방침 및 쿠키 정책 안내"
      />
      <meta
        property="og:url"
        content="https://fearless-lab.github.io/privacy"
      />

      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-32 text-white">
        <div className="max-w-3xl w-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            개인정보처리방침
          </h1>

          <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-white mb-2">
                1. 수집하는 정보
              </h2>
              <p>Fearless는 다음과 같은 정보를 수집합니다:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>
                  <strong>자동 수집 정보:</strong> 서비스 이용 통계 (Google
                  Analytics)
                </li>
                <li>
                  <strong>서비스 이용 정보:</strong> 밴픽 기록 (서비스 기능 제공
                  목적으로만 사용)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-2">
                2. 정보 이용 목적
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>
                  <strong>Google Analytics:</strong> 서비스 이용 통계 분석 및
                  서비스 개선
                </li>
                <li>
                  <strong>카카오 애드핏:</strong> 광고 제공
                </li>
                <li>
                  <strong>밴픽 기록:</strong> 사용자의 밴픽 시뮬레이션 기능 제공
                  (다른 목적으로 활용되지 않음)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-2">
                3. 쿠키(Cookie) 사용
              </h2>
              <p>
                본 웹사이트는 Google Analytics와 카카오 애드핏에서 쿠키를
                사용합니다. 브라우저 설정에서 쿠키를 거부할 수 있으며, 이 경우
                맞춤형 광고 대신 일반 광고가 표시됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-2">
                4. 제3자 서비스
              </h2>
              <p>본 서비스는 다음 제3자 서비스를 사용합니다:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>
                  <strong>Google Analytics:</strong> 웹사이트 트래픽 분석
                </li>
                <li>
                  <strong>카카오 애드핏:</strong> 광고 제공
                </li>
                <li>
                  <strong>Firebase:</strong> 밴픽 기록 저장
                </li>
              </ul>
              <p className="mt-2">
                Google의 개인정보 처리에 대한 자세한 내용은{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  Google 개인정보처리방침
                </a>
                을, 카카오의 개인정보 처리에 대한 자세한 내용은{" "}
                <a
                  href="https://www.kakao.com/policy/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  카카오 개인정보처리방침
                </a>
                을 참조하세요.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white mb-2">
                5. 이용자의 권리
              </h2>
              <p>
                이용자는 언제든지 브라우저 설정을 통해 쿠키 수집을 거부하거나
                저장된 쿠키를 삭제할 수 있습니다.
              </p>
            </section>
          </div>
        </div>
      </div>

      <AdSection />
    </>
  );
};

export default Privacy;
