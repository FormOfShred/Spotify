import { FC, ReactElement, useState } from 'react';
import {  } from '../containers/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../containers/auth/selectors';

import searchService from '../services/search';

const Search: FC = (): ReactElement => {
    const [track, setTrack] = useState<string>('');
    const [foundTracks, setFoundTracks] = useState<any[]>([]);
    const [error, setError] = useState<boolean>(false);

    const dispatch = useDispatch();
    const accessToken = useSelector(authSelectors.getAccessToken);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(track.trim() === '') {
            setError(true);
            console.log('error', error);
            return;
        }

        const response = await searchService.searchTracks(track, accessToken);

        if(response.error) {
            console.log('error', response.error);
            setFoundTracks([]);
        } else {
            setError(false);
            console.log('response', response);
            setFoundTracks(response.tracks.items.slice(0, 5));
        }
    }
    
    return (
        <div className="md:min-w-min w-6/12">
            <form className="flex gap-5" onSubmit={handleSubmit}>
                <input type="text" 
                    placeholder="Search for a track" 
                    className={"min-w-48 md:min-w-96 w-4/5 ps-3 rounded-full" + (error ? 'border border-red rounded-full' : '')}
                    value={track}
                    onChange={(event) => setTrack(event.target.value)}
                    
                 />
                <button type="submit" 
                    className="px-5 py-2 rounded-full text-white bg-green"
                >
                        Search
                </button>
            </form>

            <div className="mt-1 min-w-72">
                {foundTracks.map((track) => (
                    <div key={track.id} className="bg-white rounded-lg my-0.5 flex items-center justify-between">
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