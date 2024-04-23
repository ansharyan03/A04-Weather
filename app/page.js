'use client';
import Weather from "@/components/weather";
import Joke from "@/components/joke";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [joke, setJoke] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-arial text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full p-8">
          <h1 className="flex text-6xl font-bold text-center mb-6">{['W','E','A','T','H','E','R'].map((c)=><div className="md:ms-2 lg:ms-4">{c}</div>)}</h1>
          <div className="text-center flex flex-col">
            {["Enter a city name to get the current weather.", "Example usage: Cary, NC, US","Hyderabad, IN","Prague","Click the 'Reveal Joke' button to reveal a joke!","Come back every hour for different jokes.","Warning: jokes may be explicit or offensive in nature."].map((p)=><p className="mb-1">{p}</p>)}
            {/* <p className="m-2">Enter a city name to get the current weather.</p>
            <p>Example usage: Cary, NC, US</p>
            <p>Hyderabad, IN</p>
            <p>Prague</p>
            <p>Click the "Reveal Joke" button to reveal a joke! Come back every hour for different jokes.</p> */}
          </div>
          <div>
          <input className="lg:w-36 lg:h-10 md:w-30 md:h-8 m-2 p-2" id="cityname" type="text" placeholder="Enter a city name" />
          <button className="border border-spacing-4 border-black p-2 md:rounded-md lg:rounded-xl bg-gray-400 hover:bg-gray-100 active:bg-white" onClick={() => {
            let box = document.getElementById('cityname');
            let city = box.value;
            setCity(city);
          }
          }>Get Weather</button>
          </div>
          <div className="w-[50vw] h-[20vh] p-6">
            <Weather city={city}/>
          </div>
          <div className="flex flex-col items-center">
          <h2 className="text-center justify-center mt-6">Get a joke below!</h2>
              <button className="w-24 h-8 bg-gray-300 rounded-md border-gray-500 border-2 hover:bg-gray-100 active:bg-white" onClick={() => setJoke(!joke)}>{joke ? "Hide" : "Reveal"} Joke</button>
            <Joke enabled={joke}/>
          </div>
        </div>
      </div>
    </main>
  );
}
