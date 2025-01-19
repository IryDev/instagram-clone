import instagramLoader from '../assets/icons/instagram-loader.png'

const LoaderPage = () => {
  return (
    <div className="h-screen w-full flex justify-between items-center flex-col bg-white dark:bg-black fixed top-0 left-0 right-0 bottom-0">
        <img src={instagramLoader} alt="" />
        <div></div>
    </div>
  )
}

export default LoaderPage