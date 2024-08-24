import { FC, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from '../containers/auth/selectors';

import playlistService from '../services/playlist';

const AddPlaylistButton: FC = (): ReactElement => {
    const [open, setOpen] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const user_id = useSelector(authSelectors.getUser)?.userId;
    const accessToken = useSelector(authSelectors.getAccessToken);

    const handleSubmit = async () => {
        setOpen(false);

        if(title.trim() === '') {
            return;
        }

        console.log('title', title);

        playlistService.addNewPlaylist({
            name: title,
            description: description
        }, user_id, accessToken);

        setTitle('');
        setDescription('');
    }
    
    return (
        <div>
            <button onClick={() => setOpen(true)} className="px-5 py-2 rounded-lg text-white bg-green">Add new playlist</button>

            { open && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
                <div className="fixed inset-0 bg-gray bg-opacity-15 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-2xl font-semibold leading-6" id="modal-title">Add new playlist</h3>
                                        <div className="mt-5">
                                            <input type="text" 
                                                placeholder="Playlist name" 
                                                className="min-w-72 w-full px-3 py-2 rounded-lg border" 
                                                value={title}
                                                onChange={(event) => setTitle(event.target.value)}
                                            />
                                            <textarea placeholder="Playlist description (optional)" 
                                                className="mt-2 w-full px-3 py-2 rounded-lg border" 
                                                value={description}
                                                onChange={(event) => setDescription(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" 
                                className="inline-flex w-full justify-center bg-red-600 px-3 py-2 text-sm font-semibold rounded-lg text-white bg-green shadow-sm sm:ml-3 sm:w-auto"
                                onClick={() => handleSubmit()}
                            >
                                Create
                            </button>
                            <button type="button" 
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-red px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> }
        </div>
    );
};

export default AddPlaylistButton;