import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import { Search } from '~/components/Search';

function Header() {
    return (
        <div className="flex justify-between w-full items-center">
            <div className="flex w-full items-center gap-6">
                <div className="flex items-center text-gray-400 gap-6 ">
                    <span>
                        <HiOutlineArrowLeft size={24} />
                    </span>
                    <span>
                        <HiOutlineArrowRight size={24} />
                    </span>
                </div>
                <div className="w-1/2">
                    <Search />
                </div>
            </div>
        </div>
    );
}

export default Header;
