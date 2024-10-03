import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineFilterFrames, MdOutlinePhotoCamera } from "react-icons/md";
import { PiFlowerTulipBold, PiPaintBucketBold } from "react-icons/pi";

const MenuPreview = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log("Menu aperto", isOpen);

  const handleClickMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="py-16 text-center">
        {!isOpen ? (
          <button
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900"
            onClick={handleClickMenu}
          >
            <FaPlus size={30} />
            Aggiungi
          </button>
        ) : (
          <button
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900"
            onClick={handleClickMenu}
          >
            <IoClose size={30} />
            Chiudi
          </button>
        )}

        {isOpen && (
          <div className="-translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 m-3 rounded-lg shadow ">
            <div className="px-6">
              <a
                href="#"
                className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
              >
                Stampa foto
              </a>
            </div>
            <nav className="p-6 w-full flex flex-col flex-wrap">
              <ul className="space-y-3">
                <li>
                  <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <MdOutlinePhotoCamera size={20} />
                    Foto
                  </a>
                </li>

                <li>
                  <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <MdOutlineFilterFrames size={20} />
                    Cornici
                  </a>
                </li>

                <li>
                  <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <PiPaintBucketBold size={20} />
                    Sfondo
                  </a>
                </li>

                <li>
                  <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <PiFlowerTulipBold size={20} />
                    Sticker
                  </a>
                </li>

                <li>
                  <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <CiSettings size={20} />
                    Impostazioni
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuPreview;
