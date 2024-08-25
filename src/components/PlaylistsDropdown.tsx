import { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../containers/auth/selectors";
import { playlistSelectors } from "../containers/playlist/selectors";
import { getPlaylists } from "../containers/playlist/slice";

const PlaylistsDropdown: FC = (): ReactElement => {
    const [open, setOpen] = useState<boolean>(false);
    const [chosenPlaylist, setChosenPlaylist] = useState<string>('');

    const playlists = useSelector(playlistSelectors.getPlaylists);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaylists());
    }, [dispatch]);

    return (
       <div>
            <div className="flex">
                <button className="min-w-48 md:min-w-96 px-5 py-2 rounded-s-lg text-white bg-green cursor-default">
                    Playlist name
                </button>
                <button 
                    className="px-5 py-2 rounded-e-lg text-white bg-green"
                    onClick={() => setOpen(!open)}
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
                        <div key={playlist.id} 
                            className="bg-white my-0.5 rounded-lg cursor-pointer flex items-center"
                            onClick={() => setChosenPlaylist(playlist.name)}
                        >
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