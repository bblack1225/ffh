import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useFormStatus } from "react-dom";

type Props = {
  text: string;
};

export default function SubmitButton({ text }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
      {text}
    </Button>
  );
}
