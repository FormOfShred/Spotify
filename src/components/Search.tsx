import { FC, ReactElement, useEffect, useState } from 'react';
import {  } from '../containers/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../containers/auth/selectors';

import searchService from '../services/search';
import { searchSelectors } from '../containers/search/selectors';
import { getSearchResults, resetSearchResults } from '../containers/search/slice';
import { addTrack } from '../containers/playlists/slice';
import { playlistSelectors } from '../containers/playlists/selectors';

const Search: FC = (): ReactElement => {
    const [track, setTrack] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [playlistError, setPlaylistError] = useState<string>('');

    const searchResults = useSelector(searchSelectors.getSearchResults);
    const currentPlaylist = useSelector(playlistSelectors.getPlaylist);
    const user = useSelector(authSelectors.getUser);
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(track.trim() === '') {
            setPlaylistError('');
            setError(true);
            setTrack('');
            return;
        }

        dispatch(getSearchResults(track))
    }

    const resetSearchInput = () => {
        setPlaylistError('');
        setTrack('');
        setError(false);
        dispatch(resetSearchResults());
    }

    const handleAddTrack = (trackUri: string) => {
        console.log(user!.userName, currentPlaylist?.owner.display_name)
        console.log(user!.userName != currentPlaylist?.owner.display_name)
        console.log(currentPlaylist)
        if(user!.userName != currentPlaylist?.owner.display_name) {
            setPlaylistError('You can only add tracks to your own playlists');
            return
        }

        if(!currentPlaylist) {
            setPlaylistError('Please select a playlist');
            return;
        }
        dispatch(addTrack(trackUri));
    }
    
    return (
        <div className="min-w-min w-6/12 relative">
            <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
                <div className="relative w-4/5">
                    <input
                        type="text"
                        placeholder="Search for a track"
                        className={
                            "min-w-48 md:min-w-96 w-full ps-3 pr-8 rounded-lg border h-10" +
                            (error ? ' border-red' : '')
                        }
                        value={track}
                        onChange={(event) => setTrack(event.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={resetSearchInput}
                    >
                        ✕
                    </button>
                </div>
                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg text-white bg-green"
                >
                    Search
                </button>
            </form>
            {playlistError && <p className="text-red mt-1">{playlistError}</p>}

            <div className="absolute mt-1 lg:min-w-[40rem] z-20">
                {searchResults.map((track) => (
                    <div key={track.id} className="bg-white rounded-lg my-0.5 gap-2 flex 
                        items-center justify-between border border-green">
                        <div className="flex items-center gap-5">
                            <img src={track.album.images[0].url} alt={track.name} className="w-20 h-20 rounded-lg" />
                            <div>
                                <p>{track.name}</p>
                                <p className="hidden md:block">{track.artists.map((artist: any) => artist.name).join(', ')}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleAddTrack(track.uri)}
                            className="px-5 py-2 me-2 rounded-full text-white bg-green"
                        >Add</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;