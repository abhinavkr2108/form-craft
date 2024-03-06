import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface FormPublishToastProps {
  formId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function FormPublishToast({
  formId,
  open,
  setOpen,
}: FormPublishToastProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${baseUrl}/form/${formId}`)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to copy link");
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Published</DialogTitle>
        </DialogHeader>

        <p>
          Your Form is now live and ready to be filled by others. You can share
          it with others using the link below
        </p>
        <div className="flex gap-2 items-center w-full justify-between">
          <input
            type="text"
            disabled
            value={`${baseUrl}/form/${formId}`}
            className="px-3 py-2 w-full border-2 border-gray-300 rounded-md"
          />
          <Button onClick={copyToClipboard}>Copy Link</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
