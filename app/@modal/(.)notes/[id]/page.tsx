import { fetchNoteById } from "@/lib/api";

import ModalPreview from "@/components/NotePreview/modal";
type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <ModalPreview>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </ModalPreview>
  );
};

export default NotePreview;
