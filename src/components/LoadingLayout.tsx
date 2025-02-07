import { useSelector } from "react-redux"
import PokeballIcon from "./PokeballIcon"


const LoadingLayout = () => {

  return (
    <div className='w-full h-full flex flex-col items-center bg-white relative' >
      <PokeballIcon style={{ animation: "blink 2s linear infinite", height: "80%", position: "absolute" }} />
      <div className='w-full h-full flex flex-col px-8 pt-4 z-50 relative'>
      </div>
      <div className='w-full h-[10vh] flex bg-white flex-col rounded-t-2xl z-10' style={{ boxShadow: "0 0px 10px var(--color-black)", animation: "upContainer .3s reverse ease-in" }} >
      </div>
    </div>
  )
}

export default LoadingLayout