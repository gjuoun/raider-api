export interface BestMythicPlusScore {
  score: number,
  scoreColor: string,
  season: {
    slug: string,
    name: string
  }
}

export interface MythicPlusScore {
  score: number,
  scoreColor: string,
  runs: Run[]
  rawRuns: []
}

interface Run {
  zoneId: number,
  keystoneRunId: number,
  mythicLevel: number,
  clearTimeMs: number,
  score: number
}