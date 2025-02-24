import { memo } from "react"

const SectionHeading = memo(({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <h2 className={`text-4xl text-center max-md:text-3xl mx-auto font-semibold text-gray-900 ${className}`}>
            {children}
        </h2>
    )
})

export default SectionHeading