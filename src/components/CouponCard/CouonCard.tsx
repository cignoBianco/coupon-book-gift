
interface CouponCardProps {
    index: number,
    total: number,
    title: string,
    subtitle: string
}

const CouponCard = ({
    index,
    total,
    title,
    subtitle
}: CouponCardProps) => {
    return (
        <div className="coupon">
            <div className="coupon-header">
                <span>{String(index + 1).padStart(2, '0')} / {total}</span>
            </div>

            <div className="coupon-body">
                <h1>{title}</h1>
                <p>
                    {subtitle.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </p>
            </div>

            <button className="coupon-button">
                ИСПОЛЬЗОВАТЬ
            </button>
        </div>
    );
}

export default CouponCard;
