import { Button } from "flowbite-react";

 

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center"> 
<div className="text-xl font-semibold flex-1 justify-center flex flex-col max-w-[50%]">
    <h2>Want to learn more about TensorFlow.js ?</h2>
    <p className="text-gray-500 my-2">Checkout these resources with Tensorflow.js official documentation</p>
    <Button className="rounded-tl-xl rounded-bl-none" gradientDuoTone={"purpleToPink"}> <a href="https://www.tensorflow.org/js" target="_blank" rel="noopener noreferrer">
    Learn More </a></Button>
</div>
 <img className="max-w-[50%]" src="https://www.tensorflow.org/static/site-assets/images/project-logos/tensorflow-js-logo-social.png" />

    </div>
  )
}
