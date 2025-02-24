const RatingStars = ({ rating, count }: { rating: number; count: number }) => {
    const fullStars = Math.floor(rating);
    const lastStarPercentage = (rating - fullStars) * 100;

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: fullStars }, (_, i) => (
                <div
                    key={i}
                    className="w-6 h-6 bg-yellow-400"
                    style={{
                        clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                    }}
                />
            ))}

            {fullStars < 5 && lastStarPercentage > 0 && (
                <div
                    className="w-6 h-6"
                    style={{
                        background: `linear-gradient(90deg, #FCC509 ${lastStarPercentage}%, #D1D5DB ${lastStarPercentage}%)`,
                        clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                    }}
                />
            )}

            {Array.from({ length: 5 - Math.ceil(rating) }, (_, i) => (
                <div
                    key={`empty-${i}`}
                    className="w-6 h-6 bg-gray-300"
                    style={{
                        clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                    }}
                />
            ))}

            <span className="text-lg text-gray-700">
                {rating.toFixed(1)} ({count})
            </span>
        </div>
    );
};

export default RatingStars;
