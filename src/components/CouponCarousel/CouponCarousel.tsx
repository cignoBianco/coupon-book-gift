import { useState, useRef } from 'react';

import { coupons } from '../../data';
import CouponCard from '../CouponCard';

export function CouponCarousel() {
    const [current, setCurrent] = useState(0);
    const startX = useRef(0);

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        startX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const diff = startX.current - e.changedTouches[0].clientX;
        if (diff > 50 && current < coupons.length - 1) {
            setCurrent(current + 1);
        }
        if (diff < -50 && current > 0) {
            setCurrent(current - 1);
        }
    };

    return (
        <div
            className="carousel"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div
                className="carousel-track"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {coupons.map((c, i) => (
                    <CouponCard
                        key={c.id}
                        index={i}
                        total={coupons.length}
                        title={c.title}
                        subtitle={c.subtitle}
                    />
                ))}
            </div>
        </div>
    );
}
