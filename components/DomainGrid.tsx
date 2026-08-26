import DomainCard from './DomainCard';
import type { Domain } from '@/lib/types';

export default function DomainGrid({ list }: { list: Domain[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((d, i) => (
        <DomainCard key={d.id} d={d} index={i} />
      ))}
    </div>
  );
}
