import Header from '~/components/Header/Header';
import { Slider } from '~/components/Slider';

function Home() {
    return (
        <div className="overflow-y-auto">
            <div className="h-[70px] px-[59px] flex items-center">
                <Header />
            </div>
            <Slider className="h-full" />
        </div>
    );
}

export default Home;
