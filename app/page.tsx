import Header from '@/components/Header';
import PointCurseur from '@/components/PointCurseur';

/** La page. Vide sous l'en-tête, en attendant son contenu. */
export default function Page() {
  return (
    <>
      <PointCurseur />
      <Header />
      <div className="page" />
    </>
  );
}
