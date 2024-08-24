import { FC, ReactElement } from 'react';

const AddPlaylistButton: FC = (): ReactElement => {
    
    return (
        <div>
            <button className="px-5 py-2 rounded-full text-white bg-green">Add new playlist</button>
        </div>
    );
};

export default AddPlaylistButton;