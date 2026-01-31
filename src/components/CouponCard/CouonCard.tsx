
interface CouponCardProps {
    index: number,
    total: number,
    title: string,
    subtitle: string,
    isUsed: boolean,
    isConfirming: boolean,
    onUse: () => void,
    onConfirm: () => void,
    onCancel: () => void,
}

const CouponCard = ({
    index,
    total,
    title,
    subtitle,
    isUsed,
    isConfirming,
    onUse,
    onConfirm,
    onCancel,
}: CouponCardProps) => {
    return (
        <div className={`coupon ${isUsed ? 'coupon--used' : ''}`}>
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

            {!isConfirming && (
                <button
                    onClick={onUse}
                    disabled={isUsed}
                    className="coupon-button">
                    {isUsed ? 'ИСПОЛЬЗОВАНО =(' : 'ИСПОЛЬЗОВАТЬ'}
                </button>
            )}

            {isConfirming && (
                <div className="coupon-confirm">
                    <button onClick={onConfirm}>CONFIRM</button>
                    <button onClick={onCancel}>CANCEL</button>
                </div>
            )}
        </div>
    );
}

export default CouponCard;
