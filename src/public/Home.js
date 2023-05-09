import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '~/components/Loading';
import { NewRelease } from '~/components/NewRelease';
import { Section } from '~/components/Section';
import { Slider } from '~/components/Slider';
import { Partner } from '~/components/Partner';

function Home() {
    const { top100, womenMusic, weekChart, favoriteArtist, hotAlbum } = useSelector((state) => state.app);
    return (
        <>
            {weekChart ? (
                <div className="overflow-y-auto w-full">
                    <div className="h-[60px]"></div>
                    <Slider />
                    <NewRelease />
                    {womenMusic && <Section data={womenMusic} />}
                    {favoriteArtist && <Section data={favoriteArtist} />}
                    <div className="flex items-center w-full px-[59px] mt-12">
                        {weekChart.map((item) => (
                            <Link to={item?.link.split('.')[0]} key={item?.link} className="flex-1 px-4">
                                <img src={item?.cover} alt="zing-chart" className="object-cover rounded-md" />
                            </Link>
                        ))}
                    </div>
                    {top100 && <Section data={top100} />}
                    <Section data={hotAlbum} />
                    <Partner />
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <Loading />
                </div>
            )}
        </>
    );
}

export default Home;
