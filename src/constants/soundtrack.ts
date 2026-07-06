export const SECTION_SOUNDTRACKS = [
  {
    sectionId: "home",
    label: "Home",
    genre: "rock",
    track: "Foo Fighters - Everlong",
  },
  {
    sectionId: "stack",
    label: "Stack",
    genre: "psytrance",
    track: "Technical Hitch - Mama India",
  },
  {
    sectionId: "experiencia",
    label: "Experiencia",
    genre: "MPB",
    track: "Nando Reis - All Star",
  },
  {
    sectionId: "projetos",
    label: "Projetos",
    genre: "pop",
    track: "Ed Sheeran - Castle on the Hill",
  },
  {
    sectionId: "contato",
    label: "Contato",
    genre: "acustico",
    track: "Corey Taylor - Snuff live acoustic",
  },
] as const

export type SectionSoundtrack = (typeof SECTION_SOUNDTRACKS)[number]
