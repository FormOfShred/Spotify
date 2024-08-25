import { FC, ReactElement, useState } from 'react';
import { createPlaylist } from '../containers/playlist/slice';
import { useDispatch } from 'react-redux';

const AddPlaylistButton: FC = (): ReactElement => {
    const [open, setOpen] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [publicPlaylist, setPublicPlaylist] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if(title.trim() === '') {
            setError(true);
            return;
        }

        try {
            dispatch(createPlaylist(title, description, publicPlaylist));
        } catch (error) {
            console.log('error', error);
        }

        setOpen(false);
        setTitle('');
        setDescription('');
        setPublicPlaylist(false);
        setError(false);
        
    }

    const handleClose = () => {
        setOpen(false);
        setError(false);
        setTitle('');
        setDescription('');
        setPublicPlaylist(false);
    }
    
    return (
        <div>
            <button onClick={() => setOpen(true)} className="px-5 py-2 rounded-lg text-white bg-green">Add new playlist</button>

            { open && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray bg-opacity-15 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-2xl font-semibold leading-6" id="modal-title">Add new playlist</h3>
                                        { error && <p className="text-red font-semibold text-sm mt-5">Playlist name is required</p> }
                                        <div className="mt-5">
                                            <input type="text" 
                                                placeholder="Playlist name" 
                                                className={"min-w-72 w-full px-3 py-2 rounded-lg border" + (error ? ' border-red' : '')}
                                                value={title}
                                                onChange={(event) => setTitle(event.target.value)}
                                            />
                                            <textarea placeholder="Playlist description (optional)" 
                                                className="mt-2 w-full px-3 py-2 rounded-lg border" 
                                                value={description}
                                                onChange={(event) => setDescription(event.target.value)}
                                            />
                                            <div className="flex gap-3 mt-2">
                                                <p className="text-lg font-semibold">public</p>
                                                <input 
                                                    type="checkbox" className="mt-1"
                                                    checked={publicPlaylist}
                                                    onChange={(event) => setPublicPlaylist(event.target.checked)}
                                                />
                                            </div>
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
                                onClick={() => handleClose()}
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