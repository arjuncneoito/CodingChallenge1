/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/*
type Metadata = {
  url: string | null;
  siteName: string | null;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  author: string | null;
};
*/

/**
 * Filters the given Metadata array to only include the objects that match the given search query.
 * If the search query has multiple words,
 * treat each word as a separate search term to filter by,
 * in addition to gathering results from the overall query.
 * If the search query has special characters,
 * run the query filter with the special characters removed.
 * Can return an empty array if no Metadata objects match the search query.
 * @param {Metadata[]} metadata - An array of Metadata objects
 * @param {string} query - The search query string
 * @returns {Metadata[]} - An array of Metadata objects that match the given search query
 */
export default function filterMetadata(metadata, query) {
  const searchData = query;

  let array = [];
  if (!query && metadata) {
    return metadata;
  }
  if (!metadata || typeof query !== "string") {
    return array;
  }
  metadata.forEach((data) => {
    const finalData = data;
    const searchFinalData = data;

    for (data in finalData) {
      if (typeof searchFinalData[data] === "object") {
        searchFinalData[data]
          ? searchFinalData[data].forEach((element) => {
              const searchKey = searchData
                .toLowerCase()
                .replaceAll(".", "")
                .replaceAll(" ", " ,")
                .replaceAll("-", " ,")
                .replaceAll(", ,", ",")
                .split(",");
              const searchContent = element.toLowerCase().replaceAll(".", "");
              searchKey.forEach((data) => {
                if (searchContent.includes(data)) {
                  array.push(finalData);
                }
              });
            })
          : "";
      } else {
        const searchKey = searchData
          .toLowerCase()
          .replaceAll(".", "")
          .replaceAll(" ", " ,")
          .replaceAll("-", " ,")
          .replaceAll(", ,", ",")
          .split(",");

        const searchContent = searchFinalData[data]
          ? searchFinalData[data].toLowerCase().replaceAll(".", "")
          : "";

        searchKey.forEach((finalKeyData) => {
          if (searchContent.includes(finalKeyData)) {
            array.push(finalData);
          }
        });
      }
      const searchKey = searchData
        .toLowerCase()
        .replaceAll(" ", " ,")
        .replaceAll("-", " ,")
        .replaceAll(", ,", ",")
        .replaceAll(" ,", ",")
        .split(",");
      const searchContent = searchFinalData
        ? searchFinalData[data]
        : ""
        ? searchFinalData[data].toLowerCase().replaceAll(".", "")
        : "";

      searchKey.forEach((finalSearchKey) => {
        if (searchContent?.includes(finalSearchKey)) {
          array.push(finalData);
        }
      });
    }
  });
  array = [...new Set(array)];
  return array;
}
