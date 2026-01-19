import Link from "next/link";

type SectionWrapperProps = {
    heading: {
        body: string;
        button?: {
            body: string;
            href?: string;
        };
    }
    children?: React.ReactNode;
    className?: string;
}

export default function SectionWrapper({ heading, children, className, ...rest }: SectionWrapperProps) {
    return (
        <section className={`space-y-1 ${className ? className : ""}`} {...rest}>
            <div className="flex justify-between items-end">
                <h2 className="text-lg font-bold">{heading.body}</h2>
                {heading.button && heading.button.href ? (
                    <Link href={heading.button.href} className="text-sm font-light text-ipm-magenta-light hover-75">
                        {heading.button.body}
                    </Link>
                ) : heading.button && (
                    <span className="text-sm font-light text-ipm-magenta-light hover-75">{heading.button.body}</span>
                )}
            </div>
            {children}
        </section>
    )
}