# Log

This is a log to keep track of what I completed and on what day I completed it. It's also a way for me to keep track of any issues I may come across

## TODO
 - Confirmation toast

## Questions

- Chosen playlist gone on refresh?
- Delete/add track immediately visible?
- General redux overview -> 

## Meeting notes

switching: no saga needed
 - redux: keep state of applicaton -> what is playlist? what is track?
 - ex. save redux -> refresh keep state the same
 - side-effect in addition to redux -> load list of tracks -> getplaylistsaga good example
 - switch between playlist -> already gave list of all playlists fetch list of playlists -> click on paylist -> no request needed -> just know that the switch happened (by id) -> no saga needed
 
addtrack -> fetch playlist -> playlist updated
 - send request -> add track through playlist -> fetch playlistfrom some spotify
 - or actoin in saga to add track to playlist
 - instead of addTrackSucces -> clear request + dispatch get playlist + update

## 23/08

- I set up the environment and ran the application to see if I set it up properly.
- I took a look at the Redux documentation.
- Added Redux DevTools (for simplicity)
- Good tutorial: https://www.youtube.com/watch?v=5yEG6GhoJBs

## 24/08

- Use Postman to play with Spotify API 
- Install Tailwind
- Added search bar and add new playlist button (UI)
- Connect search bar and Spotify API
- Connect add new playlist and Spotify API
- Fetch playlists

## 25/08

- Playlist dropdown
- Explore Redux Saga
- Fetch playlists on every button click?
- Add new playlist (Redux)
- Select playlist (playlist dropdown)

## 26/08

- Delete track from playlist
- Delete track immediately visible? how? refresh? redux?

## 27/08

- Search (Reudx)
- Add track to playlist

## 28/08

- Reset search results
- Added playlist is added to playlists (in redux store)

## 30/08 

- Meeting (feedback + questions)
- Figure out refresh of tracklist

## 31/08

- Finish up automatic update of playlist (without refresh)