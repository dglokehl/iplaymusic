import Link from "next/link"
import Image from "next/image"

type CategoryCardProps = {
    category?: any;
    className?: string;
}

export default function CategoryCard({ category, className, ...rest }: CategoryCardProps) {
    return (
        <Link href={category.href} className="rounded-lg overflow-hidden" {...rest}>
            <article className="relative rounded-lg hover-bg">
                <Image src={category.icons[0].url} alt={category.name} width={category.icons[0].width} height={category.icons[0].height} className="size-full object-cover opacity-50" />
                <div className="p-3 absolute inset-0 flex justify-center items-center">
                    <h3 className="text-3xl font-bold text-center max-2xs:text-xl max-3xs:text-lg">
                        {category.name}
                    </h3>
                </div>
            </article>
        </Link>
    )
}