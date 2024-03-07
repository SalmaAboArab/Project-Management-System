import {  ThreeDots } from 'react-loader-spinner'

export default function Loader() {
  
  return <>
  <div className=" loader mx-auto">
    <ThreeDots
        visible={true}
        height="40"
        width="40"
        color="#fff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
</div>

  
  </>
}
