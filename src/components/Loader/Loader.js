import './Loader.css';
export default function Loader(props) {
    return (
        <>
        <div className='overlay'></div>
        <div className='absolute w-1/4 p-3 text-center top-50 left-50 bg-white border border-gray-300'>
            <div className='lds-roller'>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
             </div>
        <div>Loading</div>
        </div>
        </>
    );
}