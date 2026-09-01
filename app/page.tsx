import Header from '@/components/Header';
import PointCurseur from '@/components/PointCurseur';

/** La page : le hero, et son titre au centre. */
export default function Page() {
  return (
    <>
      <PointCurseur />
      <Header />
      <div className="page">
        <section className="hero">
          <h1 className="hero_titre">
            <span className="hero_ligne">Money</span>
            <span className="hero_ligne">in Check</span>
          </h1>
        </section>
      </div>
    </>
  );
}
