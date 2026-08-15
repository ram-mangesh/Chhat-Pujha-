export interface Song {
  id: number;
  title: string;
  artist: string;
  youtubeUrl: string;
  youtubeId: string;
}

export const songs: Song[] = [
  {
    id: 1,
    title: "Aaya Dub Dub Dub",
    artist: "Sharda Sinha",
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
    youtubeId: "example1",
  },
  {
    id: 2,
    title: "Gheenda Genda Genda",
    artist: "Sharda Sinha",
    youtubeUrl: "https://www.youtube.com/watch?v=example2",
    youtubeId: "example2",
  },
  {
    id: 3,
    title: "Chhath Puja Ka Aaya",
    artist: "Bhojpuri Classic",
    youtubeUrl: "https://www.youtube.com/watch?v=example3",
    youtubeId: "example3",
  },
  {
    id: 4,
    title: "Mari Chhath Puja",
    artist: "Bhojpuri Devotional",
    youtubeUrl: "https://www.youtube.com/watch?v=example4",
    youtubeId: "example4",
  },
  {
    id: 5,
    title: "Chhath Maai Ke Paib",
    artist: "Traditional",
    youtubeUrl: "https://www.youtube.com/watch?v=example5",
    youtubeId: "example5",
  },
  {
    id: 6,
    title: "Nariyaar Ke Baithke",
    artist: "Sharda Sinha",
    youtubeUrl: "https://www.youtube.com/watch?v=example6",
    youtubeId: "example6",
  },
  {
    id: 7,
    title: "Chhathi Maiya",
    artist: "Bhojpuri Bhajan",
    youtubeUrl: "https://www.youtube.com/watch?v=example7",
    youtubeId: "example7",
  },
  {
    id: 8,
    title: "Sugna Bidesiya",
    artist: "Traditional Chhath",
    youtubeUrl: "https://www.youtube.com/watch?v=example8",
    youtubeId: "example8",
  },
];
