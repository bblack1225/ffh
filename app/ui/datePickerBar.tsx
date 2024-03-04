import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function DatePickerBar() {
  return (
    <div className="flex flex-row justify-between items-center bg-slate-100 bg-background rounded-md">
      <Button variant="ghost" size="icon" className="active:bg-slate-200">
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <div>date</div>
      <Button variant="ghost" size="icon" className="active:bg-slate-200">
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
