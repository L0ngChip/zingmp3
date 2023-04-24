import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '~/components/Loading';

import { NewRelease } from '~/components/NewRelease';
import { Section } from '~/components/Section';
import { Slider } from '~/components/Slider';

function Home() {
    const { top100, womenMusic, weekChart, favoriteArtist } = useSelector((state) => state.app);
    const ref = useRef();
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, []);
    return (
        <>
            {top100 && womenMusic && weekChart && favoriteArtist ? (
                <div className="overflow-y-auto w-full">
                    <div className="h-[70px]" ref={ref}></div>
                    <Slider className="" />
                    <NewRelease />
                    <Section data={top100} />
                    <div className="flex items-center w-full px-[59px] mt-12">
                        {weekChart.map((item) => (
                            <Link to={item?.link.split('.')[0]} key={item?.link} className="flex-1 px-4">
                                <img src={item?.cover} alt="zing-chart" className="object-cover rounded-md" />
                            </Link>
                        ))}
                    </div>
                    <Section data={favoriteArtist} />
                    <Section data={womenMusic} />
                    <div className="h-[90px] w-full"></div>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center ">
                    <Loading />
                </div>
            )}
        </>
    );
}

export default Home;
