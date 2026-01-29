import Link from "next/link"

type BaseSectionProps = {
    heading: {
        body: string;
        button?: {
            body?: string;
            href: string;
        };
    }
    customWrapper?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export default function BaseSection({ heading, customWrapper, children, className }: BaseSectionProps) {
    return (
        <section className={`space-y-1 ${className ? className : ""}`}>
            <div className="flex justify-between items-end">
                <h2 className="text-lg font-bold">{heading.body}</h2>
                {heading.button && (
                    <Link href={heading.button.href} className="text-sm font-light text-ipm-magenta-light hover-75">
                        {heading.button.body ? heading.button.body : "View All"}
                    </Link>
                )}
            </div>

            {customWrapper ? children : (
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {children}
                </div>
            )}
        </section>
    )
}