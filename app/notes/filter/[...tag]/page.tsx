import React from "react";
import { getNotes } from "@/lib/api";
import { ALL_NOTES } from "@/lib/constants";
interface FilterPageProps {
  params: Promise<{ tag: string[] }>;
}

const FilterPage = async ({ params }: FilterPageProps) => {
  const { tag } = await params;
  const res = await getNotes(tag[0] === ALL_NOTES ? undefined : tag[0]);
  return <div>NotesByCategory: </div>;
};

export default FilterPage;
