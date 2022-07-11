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
  const dataToBeSearched = metadata;
  const searchData = query
  // console.log("ndcjcndjcbdjsbcdjsbcjdbcjdsb",searchData);
  let array =[]
  if(!query && metadata){
    return metadata
  }
  if(!metadata || typeof query !== 'string'){
    return array
  }
 const finaldata= metadata.map((data)=>{
  const finalData=data
  const searchFinalData=data
  // console.log(searchData);
    for(data in finalData){

      if(typeof searchFinalData[data]==="object"){
        searchFinalData[data]?searchFinalData[data].forEach(element => {
          const searchKey = searchData.toLowerCase().replaceAll(".","").replaceAll(" "," ,").replaceAll("-"," ,",).replaceAll(", ,",",").split(",");
          const searchContent = element.toLowerCase().replaceAll(".","");
          searchKey.map(data=>{
            // console.log("46....",data);
            if(searchContent.includes(data)){
              console.log("BBCHDBCHS");
              array.push(finalData)
            }
          })
          // console.log("44",searchKey)
  
        }):"";

      }
      else{
        const searchKey = searchData.toLowerCase().replaceAll(".","").replaceAll(" "," ,").replaceAll("-"," ,",).replaceAll(", ,",",").split(",");
      
        const searchContent = typeof searchFinalData[data]?searchFinalData[data].toLowerCase().replaceAll(".",""):'';
      

        searchKey.map(data=>{
          // console.log("64",searchContent);
          // console.log("65",data);
          if(searchContent.includes(data)){
            array.push(finalData)
          }
        })

      }
      const searchKey = searchData.toLowerCase().replaceAll(" "," ,").replaceAll("-"," ,",).replaceAll(", ,",",").replaceAll(" ,",",").split(",");
      const searchContent = searchFinalData?searchFinalData[data]:""?searchFinalData[data].toLowerCase().replaceAll(".",""):'';
      console.log("74",searchKey);

    

      searchKey.map(data=>{
        // console.log("78hbhbwbd", searchContent);
        // console.log("79bchbch",data ,typeof data);
        // console.log(data.tr().length)
        console.log("80",searchContent?.includes("spencergreenberg"));

        if(searchContent?.includes(data)){
          console.log("BBCHDBCHS");
          array.push(finalData)
        }
      })
      // const searchContent = typeof searchFinalData[data]!=="object"?searchFinalData[data].toLowerCase().replaceAll(".",""):'';
      // if(searchFinalData[data]?searchContent.includes(searchKey):''){
      //   array.push(finalData)
      // }
    }
  })
  // console.log(array)
  // TODO: delete and replace this with your code
  // console.log(metadata,query)
  array = [...new Set(array)];
  return array;
}
