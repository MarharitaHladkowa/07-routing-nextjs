import css from "./Header.module.css";
import Link from "next/link";
import { ALL_NOTES } from "@/lib/constants";

const Header = () => {
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
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
