"use client";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "概觀", href: "/overview", icon: HomeIcon },
  { name: "成員", href: "/members", icon: UserGroupIcon },
  { name: "收支紀錄", href: "/records", icon: DocumentDuplicateIcon },
  { name: "留言板", href: "/comments", icon: ChatBubbleOvalLeftEllipsisIcon },
];
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm bg-gray-50 font-medium hover:bg-gray-200  text-slate-500 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3`,
              { "bg-gray-200 text-black": pathname === link.href }
            )}
          >
            <LinkIcon className="w-6 hidden md:block" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
