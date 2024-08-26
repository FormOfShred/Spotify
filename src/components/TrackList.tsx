import { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playlistSelectors } from '../containers/playlists/selectors';
import { deleteTrack } from '../containers/playlists/slice';

const TrackList: FC = (): ReactElement => {
    const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);
    const dispatch = useDispatch();

    const deleteTrackFromPlaylist = (uri: string) => {
        dispatch(deleteTrack(selectedPlaylist?.id, uri));
    }
    
    return (
        <div>
            <div className="flex flex-col gap-5 mt-5">
                {selectedPlaylist?.tracks?.items.map((item) => {
                const track = item.track;

                if(track != null) {
                return (
                    <div
                    key={track.id}
                    className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center"
                    >
                    <div className="flex gap-10 items-center flex-wrap">
                        <img src={track.album.images[0].url} alt={track.name} className="w-20 h-20 rounded-lg" />
                        <div>
                        <p className="text-lg font-semibold">{track.name}</p>
                        <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
                        </div>
                        <p>{track.album.name}</p>
                        <p>{track.album.release_date}</p>
                    </div>
                    <button
                        type="button"
                        className="rounded-lg text-white bg-red h-10 w-10 flex items-center justify-center"
                        onClick={() => deleteTrackFromPlaylist(track.uri)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m4.5 19.5l15-15m-15 0l15 15" />
                        </svg>
                    </button>
                    </div>
                );
                }
            })}
            </div>
        </div>
    );
}

export default TrackList;