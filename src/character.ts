import { logger } from './app'
import axios from 'axios'
import { SearchResult, CharacterSearchResult } from 'types/search';
import { CharacterDetails } from 'types';

//https://raider.io/api/characters/eu/sanguino/Trator?season=season-bfa-4&tier=25
const characterAPIBaseUrl = `https://raider.io/api/characters`

export function generateCharUrls(searchResults: SearchResult[]): string[] {
  const characterSearchResults = <CharacterSearchResult[]>[]

  // get character searchResults
  for (let result of searchResults) {
    if (result.type === 'character') {
      characterSearchResults.push(<CharacterSearchResult>result.data)
    }
  }

  let charUrls: string[] = []
  //assemble char urls like 'us/illidan/muchgrace'
  for (let charResult of characterSearchResults) {
    const region = charResult.region.slug
    const realm = charResult.realm.slug
    const charName = charResult.name
    charUrls.push(`${region}/${realm}/${charName}`)
  }

  // only return top 3 results
  if (charUrls.length > 3) {
    charUrls = charUrls.slice(0, 3)
  }
  return charUrls
}

// expect 'eu/sanguino/Trator?season=season-bfa-4&tier=25'
export async function getCharacterDetail(charPath: string) {
  try {
    const requestUrl = `${characterAPIBaseUrl}/${charPath}?season=season-bfa-4&tier=25`
    const response = await axios.get(requestUrl)
    const characterDetail: CharacterDetails = response.data.characterDetails
    return characterDetail
  } catch (e) {
    throw new Error("Having trouble fetching character: " + charPath)
  }

}


// (async () => {
  // await getCharacterDetail(`us/illidan/Muchgrace`)
// })()



