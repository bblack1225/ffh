"use client";
import Link from "next/link";
import NavLinks from "./nav-links";
import {
  Bars4Icon,
  CurrencyDollarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function SideNav() {
  const [isNavShow, setIsNavLinkShow] = useState(false);
  const test = useRouter();
  console.log("asPath", test);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="md:mb-2 flex h-15 items-center justify-between rounded-md bg-blue-600 p-2 md:h-20">
        <div className="flex justify-center items-center md:hidden">
          <Button size="icon" onClick={() => setIsNavLinkShow((prev) => !prev)}>
            {isNavShow ? <XMarkIcon /> : <Bars4Icon />}
          </Button>
        </div>
        <div>
          <Link href="/" className="text-white flex items-center leading-none">
            <CurrencyDollarIcon className="w-10 h-10 rotate-[15deg]" />
            <p className="text-[24px] hidden md:block">家庭記帳本</p>
          </Link>
        </div>
      </div>
      <div
        className={clsx(
          "flex grow justify-between flex-col md:space-x-0 md:space-y-2 transition-all ease-in-out duration-300 overflow-hidden",
          { "h-0": !isNavShow, "h-auto": isNavShow }
        )}
      >
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
