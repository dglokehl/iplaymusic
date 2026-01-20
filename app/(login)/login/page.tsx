const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI

export default function LoginPage() {
    return (
        <main className="p-default min-h-dvh flex flex-col bg-ipm-magenta-light">
            <h1 className="text-4xl font-bold">Log In</h1>
            <div className="flex-1 flex flex-col justify-center">
                <a
                    href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private+playlist-read-collaborative+user-read-playback-position+user-top-read+user-read-recently-played+user-library-read+user-follow-read+user-read-private+user-read-email`}
                    className="py-5 block font-bold text-center uppercase border-3 border-white rounded-full"
                >
                    Login with Spotify
                </a>
            </div>
        </main>
    )
}