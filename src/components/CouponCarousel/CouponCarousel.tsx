import { useState, useRef, useEffect } from 'react';

import { coupons } from '../../data';
import CouponCard from '../CouponCard';
import { vibrate } from '../../utils/vibrate';

const STORAGE_KEY = 'used-coupons-v1';

export function CouponCarousel() {
    const [current, setCurrent] = useState(0);
    const [usedCoupons, setUsedCoupons] = useState<number[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const [confirmId, setConfirmId] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usedCoupons));
    }, [usedCoupons]);

    const startX = useRef(0);

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        startX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const diff = startX.current - e.changedTouches[0].clientX;
        if (diff > 50 && current < coupons.length - 1) {
            vibrate(6);
            setCurrent(c => c + 1);
        }
        if (diff < -50 && current > 0) {
            setCurrent(c => c - 1);
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
                style={{ transform: `translateX(calc(-${current} * (100vw - 40px) - ${current} * 20px))` }}
            >
                {coupons.map((c, i) => (
                    <CouponCard
                        key={c.id}
                        id={c.id}
                        index={i}
                        total={coupons.length}
                        title={c.title}
                        subtitle={c.subtitle}
                        isUsed={usedCoupons.includes(c.id)}
                        isConfirming={confirmId === c.id}
                        onUse={() => setConfirmId(c.id)}
                        onConfirm={() => {
                            vibrate(12);
                            setUsedCoupons(prev => [...prev, c.id]);
                            setConfirmId(null);
                        }}
                        onCancel={() => setConfirmId(null)}
                    />
                ))}
            </div>
            <div className="carousel-indicator">
                {coupons.map((_, i) => (
                    <span
                        key={i}
                        className={`dot ${i === current ? 'dot--active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}
