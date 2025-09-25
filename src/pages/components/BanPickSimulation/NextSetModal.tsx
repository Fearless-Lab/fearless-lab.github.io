import { useEffect, useState, useCallback, useRef } from "react";
import CTAButton from "@/components/CTAButton";
import { doc, onSnapshot, runTransaction } from "firebase/firestore";
import { db } from "@/firebase";
import { useBanPickController } from "@/hooks/banPick/useBanPickController";
import Draggable from "react-draggable";

interface NextSetModalProps {
  open: boolean;
  matchId: string;
  teamName: string;
  oppositeTeam: string;
  finished: boolean;
}

const NextSetModal = ({
  open,
  matchId,
  teamName,
  oppositeTeam,
  finished,
}: NextSetModalProps) => {
  const { toggleIsNextSetPreparing, createNextSet } =
    useBanPickController(matchId);

  const [votes, setVotes] = useState<{ [key: string]: string | null }>({
    [teamName]: null,
    [oppositeTeam]: null,
  });
  const [loading, setLoading] = useState(false);
  const currentSetRef = useRef<number | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchId || !open) return;

    const docRef = doc(db, "banPickSimulations", matchId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (!docSnap.exists()) return;

      const data = docSnap.data();
      const currentSetNum = data.currentSet;
      currentSetRef.current = currentSetNum;

      const currentSetVotes = data.sets?.[currentSetNum]?.votes ?? {};

      setVotes({
        [teamName]: currentSetVotes[teamName] ?? null,
        [oppositeTeam]: currentSetVotes[oppositeTeam] ?? null,
      });
    });

    return () => unsubscribe();
  }, [matchId, teamName, oppositeTeam, open]);

  const voteLoseTeam = useCallback(
    async (selectedLoseTeam: string) => {
      if (loading || currentSetRef.current === null) return;
      setLoading(true);

      const docRef = doc(db, "banPickSimulations", matchId);

      await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(docRef);
        const data = snap.data();
        const currentSet = data?.currentSet;
        const votes = data?.sets?.[currentSet]?.votes || {};
        const otherVote = votes[oppositeTeam];

        const winners = data?.winners ?? [];

        if (otherVote && otherVote !== selectedLoseTeam) {
          transaction.update(docRef, {
            [`sets.${currentSet}.votes.${teamName}`]: null,
            [`sets.${currentSet}.votes.${oppositeTeam}`]: null,
          });
        } else {
          const updates: Record<string, any> = {
            [`sets.${currentSet}.votes.${teamName}`]: selectedLoseTeam,
          };

          if (otherVote === selectedLoseTeam) {
            const winningTeam =
              selectedLoseTeam === teamName ? oppositeTeam : teamName;
            updates["winners"] = [...winners, winningTeam];

            if (currentSet === 5) {
              updates["finished"] = true;
            }
          }

          transaction.update(docRef, updates);
        }
      });

      setLoading(false);
    },
    [loading, matchId, teamName, oppositeTeam]
  );

  const bothVoted = votes[teamName] !== null && votes[oppositeTeam] !== null;
  const votesMatch = bothVoted && votes[teamName] === votes[oppositeTeam];
  const loseTeam = votes[teamName];
  const isUserLoseTeam = loseTeam === teamName;

  const chooseSide = useCallback(async (side: "blue" | "red") => {
    await createNextSet(side, teamName, oppositeTeam);
    await toggleIsNextSetPreparing(false);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40">
      <Draggable
        nodeRef={nodeRef}
        handle=".draggable-area"
        cancel="button, .no-drag"
      >
        <div
          ref={nodeRef}
          className="draggable-area bg-neutral-900 border border-neutral-700 text-white w-full max-w-lg mx-auto rounded-xl shadow-xl p-2 cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start p-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">패배 팀 선정</h2>
              <p className="text-gray-400 mt-1 text-sm">
                이번 세트에서 패배한 팀을 골라주세요
                <br />
                패배한 팀이 진영을 선택할 수 있습니다
              </p>
            </div>
          </div>

          <div className="p-4">
            {!bothVoted || !votesMatch ? (
              <div className="flex gap-3">
                <CTAButton
                  className="w-1/2"
                  disabled={loading || votes[teamName] !== null}
                  onClick={() => voteLoseTeam(teamName)}
                >
                  팀명: {teamName}
                </CTAButton>
                <CTAButton
                  className="w-1/2"
                  disabled={loading || votes[teamName] !== null}
                  onClick={() => voteLoseTeam(oppositeTeam)}
                >
                  팀명: {oppositeTeam}
                </CTAButton>
              </div>
            ) : null}

            {!finished && bothVoted && votesMatch && (
              <>
                {isUserLoseTeam ? (
                  <div className="flex gap-3">
                    <CTAButton
                      onClick={() => chooseSide("blue")}
                      className="w-1/2 bg-blue-400 text-xs md:text-sm"
                    >
                      블루 진영 선택
                    </CTAButton>
                    <CTAButton
                      onClick={() => chooseSide("red")}
                      className="w-1/2 bg-rose-400 text-xs md:text-sm"
                    >
                      레드 진영 선택
                    </CTAButton>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">
                    상대팀이 진영을 선택하고 있습니다
                    <br />
                    잠시만 기다려주세요 !
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default NextSetModal;
