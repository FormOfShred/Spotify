import { FC, ReactElement } from 'react';

const Search: FC = (): ReactElement => {
    
    return (
        <div className="md:min-w-min w-6/12">
            <form className="flex gap-5">
                <input type="text" placeholder="Search for a track" className="min-w-48 md:min-w-96 w-4/5 ps-3 rounded-full" />
                <button type="submit" className="px-5 py-2 rounded-full text-white bg-green">Search</button>
            </form>
        </div>
    );
};

export default Search;