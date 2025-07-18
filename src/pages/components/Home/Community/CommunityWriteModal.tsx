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
import { categoryGuideText, categoryOptions } from "@constants/category";

import { useCreatePost } from "@/hooks/posts/usePost";

// 나중에 분리할 필요가 있음
const CommunityWriteModal = () => {
  const { category } = useParams();
  const options = categoryOptions[category as string];

  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [errors, setErrors] = useState({
    selectedOption: "",
    title: "",
    content: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      selectedOption: "",
      title: "",
      content: "",
      password: "",
    };

    if (options.length > 0 && !selectedOption) {
      newErrors.selectedOption = "분류를 선택해주세요.";
      valid = false;
    }
    if (!title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
      valid = false;
    }
    if (!content.trim()) {
      newErrors.content = "내용을 입력해주세요.";
      valid = false;
    }
    if (!password.trim() || password.length <= 3) {
      newErrors.password = "비밀번호를 4자 이상 입력해주세요.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const mutation = useCreatePost(category as string, () => setIsOpen(false));

  const onSubmit = async () => {
    if (!validate()) return;

    mutation.mutate({
      category: category as string,
      subCategory: selectedOption,
      title,
      content,
      author: "의문의 자르반 4세",
      rawPassword: password,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedOption("");
      setTitle("");
      setContent("");
      setPassword("");
      setErrors({
        selectedOption: "",
        title: "",
        content: "",
        password: "",
      });
    }
  }, [isOpen, category]);

  useEffect(() => {
    if (options.length === 1) {
      setSelectedOption(options[0]);
    }
  }, [options]);

  return (
    <div className="flex justify-end px-6 max-w-5xl mx-auto">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <CTAButton>✏️ 글쓰기</CTAButton>
        </DialogTrigger>

        <DialogContent
          className="bg-neutral-900 border border-neutral-700 text-white max-h-[90vh] overflow-auto"
          style={{ minWidth: 320 }}
        >
          <DialogHeader>
            <DialogTitle className="text-lg">글 작성</DialogTitle>

            <DialogDescription>
              {category && category in categoryGuideText
                ? categoryGuideText[category as keyof typeof categoryGuideText]
                : "게시글을 작성해주세요."}
            </DialogDescription>
          </DialogHeader>

          {options.length > 0 && (
            <div className="space-y-1">
              <Label className="text-sm flex items-center justify-between">
                분류
                {errors.selectedOption && (
                  <span className="text-destructive text-xs ml-2">
                    {errors.selectedOption}
                  </span>
                )}
              </Label>
              <Select
                value={selectedOption}
                onValueChange={(value) => {
                  setSelectedOption(value);
                  if (errors.selectedOption) {
                    setErrors((prev) => ({ ...prev, selectedOption: "" }));
                  }
                }}
                aria-invalid={!!errors.selectedOption}
              >
                <SelectTrigger
                  className={`bg-neutral-800 text-white border ${
                    errors.selectedOption
                      ? "!border-red-500 focus-visible:!ring-red-500"
                      : "border-neutral-700"
                  }`}
                >
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

          <div className="space-y-1 mt-4">
            <Label className="text-sm flex items-center justify-between">
              제목
              {errors.title && (
                <span className="text-destructive text-xs ml-2">
                  {errors.title}
                </span>
              )}
            </Label>
            <Input
              className={`bg-neutral-800 text-white border ${
                errors.title
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-neutral-700"
              }`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: "" }));
                }
              }}
              placeholder="제목을 입력하세요"
              aria-invalid={!!errors.title}
            />
          </div>

          <div className="space-y-1 mt-4">
            <Label className="text-sm flex items-center justify-between">
              본문
              {errors.content && (
                <span className="text-destructive text-xs ml-2">
                  {errors.content}
                </span>
              )}
            </Label>
            <Textarea
              className={`bg-neutral-800 text-white border resize-none h-[120px] max-h-[150px] ${
                errors.content
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-neutral-700"
              }`}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) {
                  setErrors((prev) => ({ ...prev, content: "" }));
                }
              }}
              placeholder="내용을 입력하세요"
              aria-invalid={!!errors.content}
            />
          </div>

          <div className="space-y-1 mt-4">
            <Label className="text-sm flex items-center justify-between">
              비밀번호
              {errors.password && (
                <span className="text-destructive text-xs ml-2">
                  {errors.password}
                </span>
              )}
            </Label>
            <Input
              type="password"
              className={`bg-neutral-800 text-white border ${
                errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-neutral-700"
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
              placeholder="비밀번호를 4자 이상 입력하세요"
              aria-invalid={!!errors.password}
            />
          </div>

          <DialogFooter>
            <Button
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={onSubmit}
            >
              작성 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityWriteModal;
