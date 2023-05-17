import { nanoid } from "nanoid";

export default function uniqueID(size = 21) {
  return nanoid(size);
}
