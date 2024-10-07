import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { MdOutlineFilterFrames, MdOutlinePhotoCamera } from "react-icons/md";
import { PiFlowerTulipBold, PiPaintBucketBold } from "react-icons/pi";
import Photo from "./SubMenu/Photo";
import Frame from "./SubMenu/Frame";
import Background from "./SubMenu/Background";
import Sticker from "./SubMenu/Sticker";
import Settings from "./SubMenu/Settings";

const MenuPreview = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleClickSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // const handleClickMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };
  return (
    <>
      <div className="py-16 text-center">
        {/* <button
          className="fixed bottom-4 left-4 z-50 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900"
          onClick={handleClickMenu}
        >
          {!isMenuOpen ? <FaPlus size={30} /> : <IoClose size={30} />}
          {!isMenuOpen ? "Aggiungi" : "Chiudi"}
        </button> */}

        <div className="fixed top-0 left-0 bottom-0  w-64 bg-white border-e border-gray-200 pt-7 overflow-y-auto lg:block lg:translate-x-0 m-3 rounded-lg shadow ">
          <div className="px-6">
            <p className="flex-none font-semibold text-xl text-black cursor-default">
              Idea on Canvas
            </p>
          </div>

          <nav className="p-6 w-full flex flex-col flex-wrap">
            <ul className="space-y-3">
              <li>
                <button
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleClickSection("photo")}
                >
                  <MdOutlinePhotoCamera size={20} />
                  Foto
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleClickSection("frame")}
                >
                  <MdOutlineFilterFrames size={20} />
                  Cornici
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleClickSection("background")}
                >
                  <PiPaintBucketBold size={20} />
                  Sfondo
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleClickSection("sticker")}
                >
                  <PiFlowerTulipBold size={20} />
                  Sticker
                </button>
              </li>

              <li>
                <button
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleClickSection("settings")}
                >
                  <CiSettings size={20} />
                  Impostazioni
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sezione menu accanto al menu principale */}
        {activeSection && (
          <div className="fixed top-0 left-64 bottom-0 z-40 w-64 bg-gray-100 pt-7 pb-10 m-3 rounded-lg shadow">
            <div className="px-6">{activeSection === "photo" && <Photo />}</div>
            <div className="px-6">{activeSection === "frame" && <Frame />}</div>
            <div className="px-6">
              {activeSection === "background" && <Background />}
            </div>
            <div className="px-6">
              {activeSection === "sticker" && <Sticker />}
            </div>
            <div className="px-6">
              {activeSection === "settings" && <Settings />}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuPreview;
