

const LoadingLayout = () => {
  return (
    <div className='w-full h-full bg-slate-700 flex flex-col items-center'>
      <div className='w-full h-full flex px-8 pt-4'>
        <div className='w-full h-full grid grid-cols-2 grid-rows-2 gap-2 mr-2'>
          <div className='w-full h-full flex flex-col gap-4'>
            <div className='w-full h-12 bg-slate-500 '></div>
            <div className='flex gap-4'>
              <div className='w-full h-6 bg-slate-500 '></div>
              <div className='w-full h-6 bg-slate-500'></div>
            </div>
          </div>
          <div className='w-full h-4 bg-slate-500  self-center'></div>
          <div className='w-full h-20 bg-slate-500  col-span-2'></div>
        </div>
        <div className='w-1/2 h-full bg-slate-500 '></div>
      </div>
      <div className='w-full h-full flex bg-amber-100 flex-col rounded-t-xl'>
        <div className='w-full h-fit flex gap-4 px-8'>
          <div className='w-full h-10 bg-slate-500 '></div>
          <div className='w-full h-10 bg-slate-500 '></div>
          <div className='w-full h-10 bg-slate-500 '></div>
          <div className='w-full h-10 bg-slate-500 '></div>

        </div>
        <div className='w-full h-full flex flex-col gap-2 justify-center px-8 '>
          <div className='w-full h-4 bg-slate-500 '></div>
          <div className='w-full h-4 bg-slate-500 '></div>
          <div className='w-full h-4 bg-slate-500 '></div>
          <div className='w-full h-4 bg-slate-500 '></div>
          <div className='w-full h-4 bg-slate-500 '></div>
          <div className='w-full h-4 bg-slate-500 '></div>

        </div>
      </div>
    </div>
  )
}

export default LoadingLayout