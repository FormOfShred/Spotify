import { FC, ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "../containers/auth/selectors";

const PlaylistsDropdown: FC = (): ReactElement => {
    const [open, setOpen] = useState<boolean>(false);
    const [playlists, setPlaylists] = useState<any[]>([]);

    const user_id = useSelector(authSelectors.getUser)?.userId;
    const accessToken = useSelector(authSelectors.getAccessToken);

    const handleClick = async () => {
        setOpen(!open);

        if(!open) {
            console.log('fetch playlists');
            const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            console.log(data.items);
            setPlaylists(data.items);
        }
    }

    return (
       <div>
            <div className="flex">
                <button className="min-w-48 md:min-w-96 px-5 py-2 rounded-s-lg text-white bg-green cursor-default">Playlist name</button>
                <button 
                    className="px-5 py-2 rounded-e-lg text-white bg-green"
                    onClick={handleClick}
                >
                    { open ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4z"/>
                        </svg>
                    :
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"/>
                        </svg>
                    }
                </button>
            </div>
            <div className="mt-1">
                { open && 
                    playlists.map((playlist) => (
                        <div key={playlist.id} className="bg-white my-0.5 rounded-lg cursor-pointer flex items-center">
                            <img src={playlist.images[0].url} alt={playlist.name} className="w-16 h-16 rounded-lg" />
                            <p className="p-5">
                                {playlist.name}
                            </p>
                        </div>
                    ))
                }
            </div>
       </div>
    )
};

export default PlaylistsDropdown;