import GrilleFond from '@/components/GrilleFond';
import Header from '@/components/Header';
import PointCurseur from '@/components/PointCurseur';
import RideauIntro from '@/components/RideauIntro';

/** La page : le hero, et son titre au centre. */
export default function Page() {
  return (
    <>
      <RideauIntro />
      <GrilleFond />
      <PointCurseur />
      <Header />
      <div className="page">
        <section className="hero">
          <h1 className="hero_titre">
            <span className="hero_ligne">Money</span>
            <span className="hero_ligne">well</span>
            <span className="hero_ligne">spoken</span>
          </h1>
        </section>
      </div>
    </>
  );
}
