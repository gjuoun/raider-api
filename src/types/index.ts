import { MythicPlusScore, BestMythicPlusScore } from "./mythicPlusScore";

export type Faction = "horde" | "alliance"

interface Spec {
  name: string
  slug: string
}


export interface Class {
  id: number,
  name: string,
  slug: string,
}

interface Race {
  id: number,
  name: string,
  slug: string
  faction: Faction
}

export interface Realm {
  id: number,
  connectedRealmId: number,
  name: number,
  altName: string | null,
  slug: string,
  altSlug: string,
  locale: string,
  isConnected: boolean
}

export interface Region {
  name: string,
  slug: string,
  short_name: string
}


interface Guild {
  id: number,
  name: string,
  faction: Faction,
  realm: Realm
  region: Region
  // path: /guilds/us/illidan/Blazing Sun
  path: string
}

export interface Character {
  id: number,
  persona_id: number,
  name: string,
  class: Class,
  race: Race,
  faction: Faction
  level: number,
  spec: Spec,
  path: string,
  realm: Realm,
  region: Region,
  gender: "male" | "female"
  achievementPoints: number,
  honorableKills: number,
  itemLevelEquipped: number,
  itemLevelTotal: number,
  thumbnailUrl: string, //"//render-eu.worldofwarcraft.com/character/kazzak/222/182418654-avatar.jpg?alt=wow/static/images/2d/avatar/10-1.jpg"
  guild: Guild,
  talents: string
  talentDetails: []
}

export interface CharacterDetails {
  character: Character,
  characterCustomizations: {},
  patronLevel: string | null
  meta: {},
  newsArticle: string | null,
  raidProgress: [],
  itemDetails: {},
  seasonName: string,
  mythicPlusScores: {
    all: MythicPlusScore,
    dps: MythicPlusScore,
    tank: MythicPlusScore,
    healer: MythicPlusScore
  }
  bestMythicPlusScore: BestMythicPlusScore,
  keystoneAggregateStats: []
  previousMythicPlusScore: {}
  mythicPlusRanks: {}
  season: string,
  tier: number,
  isMissingPersonaFields: boolean,
  isTournamentProfile: boolean
}