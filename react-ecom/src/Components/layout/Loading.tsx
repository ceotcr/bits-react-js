import LoadingImage from '../../assets/loading.gif'

const Loading = ({ text }: { text: string }) => {
    return (
        <div className="col-span-full gap-4 flex flex-col items-center justify-center pt-20">
            <img src={LoadingImage}
                className="w-full max-w-[240px] rounded-full mix-blend-multiply h-full mx-auto"
                alt="Loading" />
            <p className="text-3xl">{text}</p>
        </div>
    )
}

export default Loading