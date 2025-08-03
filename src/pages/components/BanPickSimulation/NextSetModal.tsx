import { useEffect, useState, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CTAButton from "@/components/CTAButton";
import { doc, onSnapshot, runTransaction } from "firebase/firestore";
import { db } from "@/firebase";
import { useBanPickController } from "@/hooks/banPick/useBanPickController";

interface NextSetModalProps {
  open: boolean;
  matchId: string;
  teamName: string;
  oppositeTeam: string;
}

const NextSetModal = ({
  open,
  matchId,
  teamName,
  oppositeTeam,
}: NextSetModalProps) => {
  const { toggleIsNextSetPreparing, createNextSet } =
    useBanPickController(matchId);

  const [votes, setVotes] = useState<{ [key: string]: string | null }>({
    [teamName]: null,
    [oppositeTeam]: null,
  });
  const [loading, setLoading] = useState(false);
  const currentSetRef = useRef<number | null>(null);

  useEffect(() => {
    if (!matchId) return;

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
  }, [matchId, teamName, oppositeTeam]);

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

  return (
    <Dialog open={open}>
      <DialogContent
        className="bg-neutral-900 border border-neutral-700 text-white w-full max-w-[calc(100%-2rem)] mx-auto z-100 outline-none"
        showCloseButton={false}
      >
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg md:text-xl">패배 팀 선정</DialogTitle>
          <DialogDescription className="text-gray-400 mt-2 text-sm">
            이번 세트에서 패배한 팀을 골라주세요
            <br />
            패배한 팀이 진영을 선택할 수 있습니다
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
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

          {bothVoted && votesMatch && (
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
      </DialogContent>
    </Dialog>
  );
};

export default NextSetModal;
