"use client";

import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/dist/client/components/navigation";

export default function NotePreviewClients() {
  const router = useRouter();
  const close = () => {
    router.back();
  };
  return (
    <Modal isOpen={true} onClose={close}>
      <NoteDetailsClient />
    </Modal>
  );
}
