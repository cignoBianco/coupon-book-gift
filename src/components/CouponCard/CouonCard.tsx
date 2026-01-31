
const colors = ['#5BC0EB', '#FDE74C', '#9BC53D', '#E55934', '#FA7921', '#EE4266', '#3BCEAC'];

const getColorForId = (id: number) => {
    return colors[id % colors.length];
};

const adjustColor = (color: string, amount: number) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => (
        '0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
    ).substr(-2));
}

interface CouponCardProps {
    id: number,
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
    id,
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
    const cardColor = getColorForId(id);

    const cardStyle = {
        backgroundColor: cardColor,
        backgroundImage: `linear-gradient(135deg, ${cardColor} 0%, ${adjustColor(cardColor, -10)} 100%)`
    };

    return (
        <div
            className={`coupon ${isUsed ? 'coupon--used' : ''}`}
            style={cardStyle}
        >
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
                    <button onClick={onConfirm}>ДА</button>
                    <button onClick={onCancel}>НОУП</button>
                </div>
            )}
        </div>
    );
}

export default CouponCard;
