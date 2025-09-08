import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import Modal from "@/components/Modal/Modal";
import router from "next/router";
type Props = {
  params: Promise<{ id: string }>;
};
export default async function NotePreview({ params }: Props) {
  const queryClient = new QueryClient();
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <Modal onClose={() => router.back()}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={id} />
      </HydrationBoundary>
    </Modal>
  );
}
