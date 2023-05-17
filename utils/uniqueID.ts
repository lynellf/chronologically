import uniqueid from "uniqueid";

export default function uniqueID(size = 21) {
  return uniqueid()();
}
