import localforage from "localforage";

localforage.config({
  name: "photo-print",
  storeName: "print-settings",
  description: "Salvataggio delle dimensioni della tela di stampa",
});

export default localforage;
