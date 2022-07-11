// Note: Please do not use JSDOM or any other external library/package (sorry)
/*
type Metadata = {
  url: string;
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
};
*/

/**
 * Gets the URL, site name, title, description, keywords, and author info out of the <head> meta tags from a given html string.
 * 1. Get the URL from the <meta property="og:url"> tag.
 * 2. Get the site name from the <meta property="og:site_name"> tag.
 * 3. Get the title from the the <title> tag.
 * 4. Get the description from the <meta property="og:description"> tag or the <meta name="description"> tag.
 * 5. Get the keywords from the <meta name="keywords"> tag and split them into an array.
 * 6. Get the author from the <meta name="author"> tag.
 * If any of the above tags are missing or if the values are empty, then the corresponding value will be null.s
 * @param html The complete HTML document text to parse
 * @returns A Metadata object with data from the HTML <head>
 */
export default function getMetadata(htmlOld) {
  if (!htmlOld || typeof htmlOld !== "string") {
    return {
      url: null,
      title: null,
      description: null,
      keywords: null,
      author: null,
      siteName: null,
    };
  }

  const html = htmlOld.replaceAll("\n", "").replace(/\s+/g, " ");
  const regeXauthor = /<meta name="author"[^>]+>/;
  const regeXurl = /meta property="og:url[^>]+>/;

  const regeXsitename = /meta property="og:site_name"[^>]+>/;
  const regeXtitle = /(?<=<title[^>]*>).*(?=<\/title)/;
  const regexTitle = /(?<=<TITLE[^>]*>).*(?=<\/TITLE)/;

  const regeXdescription = /meta property="og:description"[^>]+>/;
  const regexDescription = /<meta name="description"[^>]+>/;

  const regeXKeywords = /meta name="keywords" [^>]+>/;

  const urlfinal = html?.match(regeXurl) ? html?.match(regeXurl)[0] : null;
  const url = urlfinal
    ? urlfinal.substring(urlfinal.indexOf("content") + 9) === '" />'
      ? ""
      : urlfinal.substring(urlfinal.indexOf("content") + 9).slice(0, -2)
    : null;

  const keywordfinal = html?.match(regeXKeywords)
    ? html?.match(regeXKeywords)[0]
    : null;
  let keywords;
  const keyword = keywordfinal
    ? keywordfinal.substring(keywordfinal.indexOf("content") + 9) === '" />' // const descriptionfinal = html?.match(regeXdescription)
      ? []
      : [
          keywordfinal
            .substring(keywordfinal.indexOf("content") + 9)
            .slice(0, -2),
        ]
    : null;
  if (keyword ? keyword[0]?.includes(",") : "") {
    const keywordReplace = keyword[0].replaceAll('"', "");
    keywords = keywordReplace.split(",");
  } else {
    keywords = keyword;
  }



  const siteNamefinal = html?.match(regeXsitename)
    ? html?.match(regeXsitename)[0]
    : null;
  const siteName = siteNamefinal
    ? siteNamefinal.substring(siteNamefinal.indexOf("content") + 9) === '" />'
      ? ""
      : siteNamefinal
          .substring(siteNamefinal.indexOf("content") + 9)
          .slice(0, -2)
    : null;




  const descriptionfinal = html?.match(regeXdescription)
    ? html?.match(regeXdescription)[0]
    : html?.match(regexDescription)
    ? html?.match(regexDescription)[0]
    : null || null;
  const description = descriptionfinal
    ? descriptionfinal.substring(descriptionfinal.indexOf("content") + 9) ===
      '" />'
      ? ""
      : descriptionfinal
          .substring(descriptionfinal.indexOf("content") + 9)
          .slice(0, -2)
    : null;



  const title = html?.match(regeXtitle)
    ? html?.match(regeXtitle)[0]
    : html?.match(regexTitle)
    ? html?.match(regexTitle)[0]
    : null || null;


  const authorfinal = html?.match(regeXauthor)
    ? html.match(regeXauthor)[0]
    : null;
  const author = authorfinal
    ? authorfinal.substring(authorfinal.indexOf("content") + 9) === '" />'
      ? ""
      : authorfinal.substring(authorfinal.indexOf("content") + 9).slice(0, -2)
    : null;


  const finalurl = url ? url.replace('"', "").replace(" ", "") : url;
  const finaldescription = description
    ? description.replace('."', ".")
    : description;


  const finalAuthor = author ? author.replace('" ', "") : author;

  
  const finalSitename = siteName ? siteName.replace('" ', "") : siteName;
  return {
    url: finalurl ? finalurl : url,
    title,
    description: finaldescription ? finaldescription : description,
    keywords: keywords,
    author: finalAuthor ? finalAuthor : author,
    siteName: finalSitename ? finalSitename : siteName,
  };
}
