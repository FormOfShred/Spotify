import { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playlistSelectors } from "../containers/playlists/selectors";
import { getPlaylists, getPlaylist } from "../containers/playlists/slice";
import { Playlist } from "../types/playlists";

const PlaylistsDropdown: FC = (): ReactElement => {
    const [open, setOpen] = useState<boolean>(false);

    const playlists = useSelector(playlistSelectors.getPlaylists);
    const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);
    const dispatch = useDispatch();

    const handleDropdown = () => {
        setOpen(!open);

        if(!open) {
            dispatch(getPlaylists());
        }
        
    }

    const handleChoosePlaylist = (playlist: Playlist) => {
        setOpen(false);

        if(playlist.id) {
            dispatch(getPlaylist(playlist.id));
        }
    }

    useEffect(() => {
        if(open) {
            dispatch(getPlaylists());
        }
    }, [open, dispatch]);

    return (
       <div>
            <div className="flex">
                <button className="min-w-[15rem] sm:min-w-[25rem] px-5 py-2 rounded-s-lg text-white bg-green cursor-default">
                    { selectedPlaylist ? selectedPlaylist.name : "Choose a playlist" }
                </button>
                <button 
                    className="px-5 py-2 w-[4rem] rounded-e-lg text-white bg-green"
                    onClick={handleDropdown}
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
            <div className="mt-1 absolute min-w-[19rem] sm:min-w-[29rem] z-10">
                { open &&
                    playlists.map((playlist) => (
                        <div key={playlist.id} 
                            className="bg-white my-0.5 rounded-lg cursor-pointer flex items-center"
                            onClick={() => handleChoosePlaylist(playlist)}
                        >
                            <p className="p-3">
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