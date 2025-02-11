import { useSelector } from "react-redux"
import PokeballIcon from "./PokeballIcon"


const LoadingLayout = () => {

  return (
    <div className='h-full flex flex-col items-center bg-white relative transition-all duration-300' >
      <PokeballIcon style={{ animation: "blink 2s linear infinite",width: "100%", height: "100%", opacity: "0.60" }} />
      {/* <div className='w-full h-[10vh] flex bg-white flex-col rounded-t-2xl z-10' style={{ boxShadow: "0 0px 10px var(--color-black)", animation: "upContainer .3s reverse ease-in" }} >
      </div> */}
    </div>
  )
}

export default LoadingLayout