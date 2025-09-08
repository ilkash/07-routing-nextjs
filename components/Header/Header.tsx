import Link from "next/link";
import css from "./Header.module.css";
import { fetchTagList } from "@/lib/api";
import TagsMenu from "../TagsMenu/TagsMenu";

export default async function Header() {
  const tags = await fetchTagList();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.navigationLink}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu tags={tags} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
