import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CTAButton from "@/components/CTAButton";

const rankOptions: Record<string, string[]> = {
  scrim: ["일반", "피어리스", "하드피어리스"],
  duo: [
    "아이언",
    "브론즈",
    "실버",
    "골드",
    "플래티넘",
    "에메랄드",
    "다이아몬드",
  ],
  flexQueue: ["자유랭크"],
  free: ["자유"],
};

const CommunityWriteModal = () => {
  const { category } = useParams();
  const options = rankOptions[category || ""] || [];

  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setSelectedOption("");
  }, [category]);

  return (
    <div className="flex justify-end px-6 max-w-5xl mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <CTAButton>✏️ 글쓰기</CTAButton>
        </DialogTrigger>

        <DialogContent className="bg-neutral-900 border border-neutral-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg">글 작성</DialogTitle>
            <DialogDescription>작성할 내용을 입력해주세요.</DialogDescription>
          </DialogHeader>

          {options.length > 0 && (
            <div className="space-y-1">
              <Label className="text-sm">분류</Label>
              <Select
                value={selectedOption}
                onValueChange={(v) => setSelectedOption(v)}
              >
                <SelectTrigger className="bg-neutral-800 border border-neutral-700 text-white">
                  <SelectValue placeholder="분류 선택" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-700 text-white">
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1">
            <Label className="text-sm">제목</Label>
            <Input
              className="bg-neutral-800 border border-neutral-700 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-sm">본문</Label>
            <Textarea
              className="bg-neutral-800 border border-neutral-700 text-white h-[160px] max-h-[200px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          </div>

          <DialogFooter>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              작성 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityWriteModal;
