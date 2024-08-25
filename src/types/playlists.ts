export interface Playlist {
    id?: string;
    name: string;
    description?: string;
    images?: string[];
    tracks?: Track[];
}

export interface Track {
    id: string;
    name: string;
    artist: string;
    album: string;
    duration: number;
}