import AlbumCard, { AlbumCardProps, ArtistAlbumCard, ArtistAlbumCardProps } from "../cards/AlbumCard"
import PlaylistCard, { PlaylistCardProps } from "../cards/PlaylistCard"
import ArtistCard, { ArtistCardProps } from "../cards/ArtistCard"
import type { CardSize } from "../cards/BaseCard"

type MapAlbumCardsProps = {
    albums: AlbumCardProps[];
    userAlbums?: boolean
    size?: CardSize;
}
export function MapAlbumCards({ albums, userAlbums, size }: MapAlbumCardsProps) {
    if (userAlbums) return albums.map((album: any, i: number) => (
        <AlbumCard
            album={{
                id: album.album.id,
                images: album.album.images,
                name: album.album.name,
                artists: album.album.artists,
            }}
            {...(size && ({ size: size }))}
            key={i}
        />
    ))

    return albums.map((album: AlbumCardProps, i: number) => (
        <AlbumCard
            album={{
                id: album.id,
                images: album.images,
                name: album.name,
                artists: album.artists,
            }}
            {...(size && ({ size: size }))}
            key={i}
        />
    ))
}

type MapArtistAlbumCardsProps = {
    albums: ArtistAlbumCardProps[];
    size?: CardSize;
}
export function MapArtistAlbumCards({ albums, size }: MapArtistAlbumCardsProps) {
    return albums.map((album, i: number) => (
        <ArtistAlbumCard
            album={{
                id: album.id,
                images: album.images,
                name: album.name,
                release_date: album.release_date,
                album_type: album.album_type,
            }}
            {...(size && ({ size: size }))}
            key={i}
        />
    ))
}


type MapPlaylistCardsProps = {
    playlists: PlaylistCardProps[];
    size?: CardSize;
}
export function MapPlaylistCards({ playlists, size }: MapPlaylistCardsProps) {
    return playlists.map((playlist, i: number) => (
        <PlaylistCard
            playlist={{
                id: playlist.id,
                images: playlist.images,
                name: playlist.name,
                owner: playlist.owner,
            }}
            {...(size && ({ size: size }))}
            key={i}
        />
    ))
}


type MapArtistCardsProps = {
    artists: ArtistCardProps[];
    size?: CardSize;
}
export function MapArtistCards({ artists, size }: MapArtistCardsProps) {
    return artists.map((artist, i: number) => (
        <ArtistCard
            artist={{
                id: artist.id,
                images: artist.images,
                name: artist.name,
            }}
            {...(size && ({ size: size }))}
            key={i}
        />
    ))
}