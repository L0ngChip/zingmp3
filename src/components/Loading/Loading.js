import { Triangle } from 'react-loader-spinner';

function Loading() {
    return (
        <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    );
}

export default Loading;
