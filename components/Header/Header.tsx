import { getCategories } from "@/lib/api";
import css from "./Header.module.css";
import Link from "next/link";

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
              <Link href="/notes/filter/all">All Notes</Link>
            </li>
            {categories.map((item) => (
              <li key={item.id}>
                <Link href={`/notes/filter/${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
