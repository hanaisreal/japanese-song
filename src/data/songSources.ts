export interface SongSource {
  id: string;
  title: string;
  artist: string;
  url: string;
  youtubeId?: string;
  audioFile?: string;
}

export const songSources: SongSource[] = [
  {
    id: 'akari',
    title: '燈',
    artist: '崎山蒼志',
    url: 'https://www.uta-net.com/song/340421/',
    youtubeId: '4jWzGkRsHw8',
  },
  {
    id: 'night-dancer',
    title: 'NIGHT DANCER',
    artist: 'imase',
    url: 'https://www.uta-net.com/song/323397/',
    youtubeId: 'kagoEGKHZvU',
  },
];
