import { getCategories } from "@/lib/api";
import css from "./Header.module.css";
import Link from "next/link";
import { ALL_NOTES } from "@/lib/constants";

const Header = async () => {
  const categories = await getCategories();
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <ul>
            <li>
              <Link href={`/notes/filter/${ALL_NOTES}`}>All Notes</Link>
            </li>
            {categories.map((item) => (
              <li key={item.id}>
                <Link href={`/notes/filter/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
