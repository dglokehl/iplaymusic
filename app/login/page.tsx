import Wrapper from "@/components/Wrapper"

const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI

export default function LoginPage() {
    return (
        <Wrapper title="Login">
            <a href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private+playlist-read-collaborative+user-read-playback-position+user-top-read+user-read-recently-played+user-library-read+user-follow-read+user-read-private+user-read-email`}>
                Login with Spotify
            </a>
        </Wrapper>
    )
}