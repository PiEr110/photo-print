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
        <div className="fixed bottom-0 left-0 top-0 m-3 w-64 overflow-y-auto rounded-lg border-e border-gray-200 bg-white pt-7 shadow lg:block lg:translate-x-0">
          <div className="px-6">
            <p className="flex-none cursor-default text-xl font-semibold text-black">
              Idea on Canvas
            </p>
          </div>

          <nav className="flex w-full flex-col flex-wrap p-6">
            <ul className="space-y-3">
              <li>
                <button
                  className="flex w-full cursor-pointer items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => handleClickSection("photo")}
                >
                  <MdOutlinePhotoCamera size={20} />
                  Foto
                </button>
              </li>

              <li>
                <button
                  className="flex w-full cursor-pointer items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => handleClickSection("frame")}
                >
                  <MdOutlineFilterFrames size={20} />
                  Cornici
                </button>
              </li>

              <li>
                <button
                  className="flex w-full cursor-pointer items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => handleClickSection("background")}
                >
                  <PiPaintBucketBold size={20} />
                  Sfondo
                </button>
              </li>

              <li>
                <button
                  className="flex w-full cursor-pointer items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => handleClickSection("sticker")}
                >
                  <PiFlowerTulipBold size={20} />
                  Sticker
                </button>
              </li>

              <li>
                <button
                  className="flex w-full cursor-pointer items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-200"
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
          <div className="fixed bottom-0 left-64 top-0 z-40 m-3 w-64 rounded-lg bg-gray-100 pb-10 pt-7 shadow">
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
