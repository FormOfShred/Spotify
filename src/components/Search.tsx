import { FC, ReactElement, useEffect, useState } from 'react';
import {  } from '../containers/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../containers/auth/selectors';

import searchService from '../services/search';
import { searchSelectors } from '../containers/search/selectors';
import { getSearchResults } from '../containers/search/slice';

const Search: FC = (): ReactElement => {
    const [track, setTrack] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    let searchResults = useSelector(searchSelectors.getSearchResults);
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(track.trim() === '') {
            setError(true);
            setTrack('');
            return;
        }

        dispatch(getSearchResults(track))
    }
    
    return (
        <div className="min-w-min w-6/12 relative">
            <form className="flex gap-5" onSubmit={handleSubmit}>
                <input type="text" 
                    placeholder="Search for a track" 
                    className={"min-w-48 md:min-w-96 w-4/5 ps-3 rounded-lg border" + (error ? ' border-red' : '')}
                    value={track}
                    onChange={(event) => setTrack(event.target.value)}
                    
                >
                </input>
                <button type="submit" 
                    className="px-5 py-2 rounded-lg text-white bg-green"
                >
                        Search
                </button>
            </form>

            <div className="absolute mt-1 min-w-72 z-20">
                {searchResults.map((track) => (
                    <div key={track.id} className="bg-white rounded-lg my-0.5 gap-2 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <img src={track.album.images[0].url} alt={track.name} className="w-20 h-20 rounded-lg" />
                            <div>
                                <p>{track.name}</p>
                                <p className="hidden md:block">{track.artists.map((artist: any) => artist.name).join(', ')}</p>
                            </div>
                        </div>
                        <button className="px-5 py-2 me-2 rounded-full text-white bg-green">Add</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;