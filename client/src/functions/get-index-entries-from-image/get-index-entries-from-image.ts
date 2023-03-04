import { recognize } from "tesseract.js";
import { IndexEntry } from "../../types";

export const getIndexEntriesFromImage = async ({
  image,
}: {
  image: string;
}): Promise<IndexEntry[]> => {
  const result = await recognize(image, "eng", {
    logger: (m) => console.log(m),
  });

  console.log(JSON.stringify(result, null, 2));

  return [];
};
