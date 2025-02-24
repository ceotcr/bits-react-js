import { memo } from 'react'
import HeroImage from '../../assets/hero.jpg'

const Hero = memo(() => {
    return (
        <section className="relative isolate px-6 pt-14 lg:px-8 w-full">
            <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}>
                </div>
            </div>
            <div
                className="w-full mx-auto max-w-[1440px] grid grid-cols-1 gap-y-16 items-center md:grid-cols-2 md:gap-x-8 lg:gap-x-16">
                <div className="">
                    <div className="text-left max-md:text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                            <i className="text-[#281C02]">Opulenze</i> <br />
                            Indulge in&nbsp;<i className="text-[#DA9100]">Elegance</i>.
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Discover a curated
                            collection
                            of exquisite products, crafted for those who appreciate the finest things in life.</p>
                        <div className="mt-10 flex items-center md:justify-start justify-center gap-x-6">
                            <a href="./products/"
                                className="rounded-md bg-[#281C02] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:opacity-90 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Explore
                                Products</a>
                        </div>
                    </div>
                </div>
                <img src={HeroImage} alt="luxury items"
                    className="w-full h-full object-cover object-right md:max-h-[720px] max-h-[360px] rounded-lg" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}>
                </div>
            </div>
        </section>
    )
})

export default Hero