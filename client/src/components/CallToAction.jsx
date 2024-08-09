import { Button } from "flowbite-react";
// import projectImage f/rom '../assets/projectImage.jpg'


export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border  border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col gap-2">
        <h2 className="text-2xl">Want to learn more about Development?</h2>
        <p className="text-gray-500 my-2">Checkout these resources</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a href="/" rel="noopener noreferrer">
            MERN Stack
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg?auto=compress&cs=tinysrgb&w=600" />
      </div>
    </div>
  );
}
