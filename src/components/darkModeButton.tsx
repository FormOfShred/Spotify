import { useDispatch, useSelector } from "react-redux";
import { darkModeSelectors } from "../containers/darkMode/selectors";
import { toggleDarkMode } from "../containers/darkMode/slice";

const DarkModeButton = () => {
    const darkMode = useSelector(darkModeSelectors.getDarkMode);
    const dispatch = useDispatch();

    const changeDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        dispatch(toggleDarkMode());
    }

    return (
        <div>
            <button
                className="px-4 py-2 rounded"
                onClick={changeDarkMode}
            >
                {darkMode 
                ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                    <path fill="#C0C0C0" d="M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                    <path fill="#FFA500" d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1m2.5 7a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m2.45-3.89a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062zM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8m-3.11 4.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061zM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12m-2.828-.11a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06zM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8m.11-2.828A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06z"/>
                </svg>
        }
            </button>
        </div>
    );
}

export default DarkModeButton;