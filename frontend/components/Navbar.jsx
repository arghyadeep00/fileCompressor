"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full">
      <nav className="flex justify-between p-7">
        <div className="-mt-5">
          <Image src="/logo.png" width={60} height={60} alt="logo" />
        </div>
        <ul className="hidden sm:flex gap-5">
          <li className="cursor-pointer">
            <Link href={"/"} className={pathname === "/" ? "border-b" : ""}>
              Home
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              href={"/compress_pdf"}
              className={pathname === "/compress_pdf" ? "border-b" : ""}
            >
              Compress PDF
            </Link>{" "}
          </li>
          <li className="cursor-pointer">
            <Link
              href={"/compress_image"}
              className={pathname === "/compress_image" ? "border-b" : ""}
            >
              {" "}
              Compress Image
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              href={"/resize_image"}
              className={pathname === "/resize_image" ? "border-b" : ""}
            >
              Resize Image
            </Link>
          </li>
        </ul>

        <div className="md:hidden flex items-center relative">
          <button
            className="p-2 bg-white rounded-full shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Open menu"
            type="button"
          >
            <IoMenu className="text-black text-3xl" />
          </button>
          <ul className="absolute top-12 right-0 w-40 bg-black shadow-lg rounded-lg py-2 z-50">
            <li>
              <Link
                href="/"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  pathname === "/" ? "bg-red-100 font-semibold" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/compress_pdf"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  pathname === "/compress_pdf" ? "bg-red-100 font-semibold" : ""
                }`}
              >
                Compress PDF
              </Link>
            </li>
            <li>
              <Link
                href="/compress_image"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  pathname === "/compress_image"
                    ? "bg-red-100 font-semibold"
                    : ""
                }`}
              >
                Compress Image
              </Link>
            </li>
            <li>
              <Link
                href="/resize_image"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  pathname === "/resize_image" ? "bg-red-100 font-semibold" : ""
                }`}
              >
                Resize Image
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
