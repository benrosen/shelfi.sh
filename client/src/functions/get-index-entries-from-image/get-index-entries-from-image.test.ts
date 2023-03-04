/**
 * @jest-environment node
 */

import { join } from "path";
import { IndexEntry } from "../../types";
import { default as scenario1IndexEntries } from "../test-assets/1.index-entries";
import { getIndexEntriesFromImage } from "./get-index-entries-from-image";

jest.setTimeout(30000);

describe(`The ${getIndexEntriesFromImage.name} function`, () => {
  test.each([["./src/functions/test-assets/1.png", scenario1IndexEntries]] as [
    string,
    IndexEntry[]
  ][])(
    `should return the expected result`,
    async (imagePath, expectedIndexEntries) => {
      const path = join(process.cwd(), imagePath);

      console.log(path);

      const result = await getIndexEntriesFromImage({ image: path });

      expect(result).toStrictEqual(expectedIndexEntries);
    }
  );
});
