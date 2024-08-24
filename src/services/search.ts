import { useSelector } from "react-redux";
import { authSelectors } from "../containers/auth/selectors";

const searchTracks = async (track: string, accessToken: string | undefined) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
}

export default {
    searchTracks
};