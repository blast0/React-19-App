import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DialogBox({
  title = "title",
  trigger = <></>,
  desc = "",
  modalJsx = <></>,
  open = false,
}) {
  const [isOpen, setIsopen] = useState(open);

  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <DialogTrigger
        className="flex text-xs items-center cursor-pointer hover:bg-[#f9f3f4]"
        onClick={() => setIsopen((prev) => !prev)}
        asChild
      >
        {trigger}
      </DialogTrigger>

      <DialogContent
        className="
          max-w-[95vw] sm:max-w-[450px] 
          w-full
          p-4 sm:p-6 
          flex flex-col 
          gap-4 
          rounded-xl
        "
      >
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            {title}
          </DialogTitle>
          {desc ? (
            <DialogDescription className="text-sm sm:text-base">
              {desc}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        <div className="w-full flex flex-col items-center gap-3 py-2">
          {modalJsx}
        </div>

        <div className="flex justify-center">
          <Button
            className="hover:bg-red-400 hover:text-white transition"
            onClick={() => setIsopen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
