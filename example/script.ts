import { SpotifyApi } from "../src/index";
import AuthorizationCodeWithPKCEStrategy from "../src/auth/AuthorizationCodeWithPKCEStrategy";

const implicitGrantStrategy = new AuthorizationCodeWithPKCEStrategy(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_REDIRECT_TARGET,
    ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private, user-read-playback-state, user-modify-playback-state']
);

const spotify = new SpotifyApi(implicitGrantStrategy);
const profile = await spotify.currentUser.profile();
console.log(profile);

document.getElementById("displayName")!.innerText = profile.display_name;
if (profile.images[0]) {
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[0].url;
    document.getElementById("avatar")!.appendChild(profileImage);
}
document.getElementById("id")!.innerText = profile.id;
document.getElementById("email")!.innerText = profile.email;
document.getElementById("uri")!.innerText = profile.uri;
document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
document.getElementById("url")!.innerText = profile.href;
document.getElementById("url")!.setAttribute("href", profile.href);
document.getElementById("imgUrl")!.innerText = profile.images[0]?.url ?? '(no profile image)';
