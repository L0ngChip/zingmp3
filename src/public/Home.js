import { Section } from '~/components/Section';
import { Slider } from '~/components/Slider';

function Home() {
    return (
        <div className="overflow-y-auto w-full">
            <Slider className="h-full" />
            <Section />
        </div>
    );
}

export default Home;
