import { Button } from "flowbite-react";

 

export default function Chart() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center gap-2"> 
<div className="text-xl font-semibold flex-1 justify-center flex flex-col max-w-[50%]">
    <h2> I tried chart.js !</h2>
    <p className="text-gray-500 my-2">Checkout the Page</p>
    <Button className="rounded-tl-xl rounded-bl-none" gradientDuoTone={"purpleToPink"}> <a href="https://catalog23.netlify.app/home_about_oil_price" target="_blank" rel="noopener noreferrer">
     Visit site </a></Button>
</div>
 <img className="max-w-[50%] rounded-md" src="https://img-c.udemycdn.com/course/750x422/519596_bd8c_3.jpg"/>

    </div>
  )
}
