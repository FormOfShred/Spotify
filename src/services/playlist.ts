import { Playlist } from "../types/playlists";

const addNewPlaylist = async (playlist: Playlist, userId: string | undefined, accessToken: string | undefined) => {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body : JSON.stringify({
            name: playlist.name,
            description: playlist.description,
            public: false
        })
    })
    const data = await response.json();
    console.log('data', data);
}

export default {
    addNewPlaylist
}