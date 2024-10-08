export interface Playlist {
    id?: string;
    name: string;
    description?: string;
    tracks?: {
        items: Track[];
    };
    owner: {
        display_name: string;
    }; 
}

export interface Track {
    track: {
        id: string;
        name: string;
        artists: [{ name: string }];
        album: {
            images: [{ url: string }];
            name: string;
            release_date: string;
        };
        uri: string;
        
    }
}