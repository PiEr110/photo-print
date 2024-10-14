import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.tsx";
import "./index.css";

// //Esempio di come potrebbe funzionare Shadow DOM
// const hostElement = document.getElementById("root-react"); //elemento root generato da wordpress
// if (hostElement) {
//   // Creazione di uno Shadow Roor con modalità "open"
//   const shadowRoot = hostElement.attachShadow({ mode: "open" });

//   // Creazione di un div per montare l'app React
//   const reactContainer = document.createElement("div");
//   shadowRoot.appendChild(reactContainer);

//   // Iniettare gli stili nello Shadow Dom
//   const style = document.createElement("style");
//   // style.textContent =
//   //   document.querySelector("style[data-tailwind]")?.textContent ?? "";
//   style.textContent = `@import url('./src/index.css')`;
//   shadowRoot.appendChild(style);

//   // Montiamo l'app React nel contenitore
//   createRoot(reactContainer).render(
//     <StrictMode>
//       <NextUIProvider>
//         <App />
//       </NextUIProvider>
//     </StrictMode>,
//   );
// } else {
//   console.error("Elemento con id 'root' non trovato");
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </StrictMode>,
);
