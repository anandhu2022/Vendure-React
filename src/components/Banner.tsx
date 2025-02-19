const Banner = () => {
    return (
        <>
            <div className="h-full bg-gray-700 flex justify-center items-center flex-col">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 to-blue-700 text-transparent bg-clip-text inline-block">
                    Vendure ReactJs Starter Kit
                </h1>
                <h3 className="text-white text-3xl max-w-3xl text-center p-4">A headless commerce storefront
                    starter kit built with &nbsp;
                    <a href="https://vendure.io/" className="text-blue-500 hover:underline">
                        Vendure
                    </a>
                    &nbsp;&&nbsp;
                    <a href="https://react.dev/" className="text-blue-500 hover:underline">
                        ReactJs
                    </a>
                </h3>
            </div>
        </>
    );
};

export default Banner;
