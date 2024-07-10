'use client';

type Bakery = {
    bakery_id: string;
    name: string;
    image: string;
    phone: string | null;
    address: string;
    x: number | null;
    y: number | null;
};

import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { BakeryCard } from '../commons/BakeryCard';
import Link from 'next/link';

export const BakeryList = () => {
    const [breads, setBreads] = useState<Bakery[]>([]);

    useEffect(() => {
        const supabase = createClient();
        const fetchBreads = async () => {
            const { data } = await supabase.from('bakery').select('*');
            setBreads((data as Bakery[]) || []);
        };
        fetchBreads();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {breads.map((bakery) => (
                <Link
                    href={{
                        pathname: `/detail/${bakery.bakery_id}`,
                        query: {
                            name: bakery.name,
                            x: bakery.x,
                            y: bakery.y,
                        },
                    }}
                    key={bakery.bakery_id}
                    passHref
                >
                    <div>
                        <BakeryCard
                            image={bakery.image}
                            name={bakery.name}
                            phone={bakery.phone}
                            address={bakery.address}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
};
