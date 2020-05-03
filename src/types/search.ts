import { Faction, Region, Realm, Class } from "types";

export interface SearchResult {
  type: "character" | "guild",
  name: string,
  data: CharacterSearchResult | GuildSearchResult
}

export interface CharacterSearchResult {
  id: number,
  name: string,
  faction: Faction,
  region: Region,
  realm: Realm,
  class: Class,
}

interface GuildSearchResult {

}