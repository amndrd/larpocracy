import Accroche from '@/components/Accroche';
import Header from '@/components/Header';
import PointCurseur from '@/components/PointCurseur';

/** La page. L'accroche tient le premier écran ; la suite viendra dessous. */
export default function Page() {
  return (
    <>
      <PointCurseur />
      <Header />
      <div className="page">
        <Accroche />
      </div>
    </>
  );
}
