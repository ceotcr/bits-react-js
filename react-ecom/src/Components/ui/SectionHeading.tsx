import { memo } from "react"

const SectionHeading = memo(({ children }: {
    children: React.ReactNode
}) => {
    return (
        <h2 className="text-4xl max-md:text-3xl mx-auto font-semibold text-gray-900">
            {children}
        </h2>
    )
})

export default SectionHeading