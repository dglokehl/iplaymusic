import MusicPlayer from "../MusicPlayer"

type FooterMusicPlayerProps = {
    open?: boolean;
    className?: string;
}

export default function FooterMusicPlayer({ open, className }: FooterMusicPlayerProps) {
    return (
        <div className={`pb-footer size-full fixed inset-0 ${!open && "top-full"} duration-500 ease-in-out z-999 bg-bg ${!className ? className : ""}`}>
            <MusicPlayer className="wrapper-default pb-12" />
        </div>
    )
}