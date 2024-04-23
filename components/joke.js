import React, { useEffect, useState } from 'react';

export default function Joke({enabled}) {
    const [joke, setJoke] = useState('');
    let seed = {
        1: '0-12',
        2: '13-24',
        3: '25-36',
        4: '37-48',
        5: '49-60',
        6: '61-72',
        7: '73-84',
        8: '85-96',
        9: '97-108',
        10: '109-120',
        11: '121-132',
        12: '133-144',
        13: '145-156',
        14: '157-168',
        15: '169-180',
        16: '181-192',
        17: '193-204',
        18: '205-216',
        19: '217-228',
        20: '229-240',
        21: '241-252',
        22: '253-264',
        23: '265-276',
        24: '277-288'
    }

    const fetchJoke = async () => {
        setJoke("Loading...");
        const hour = new Date().getHours();
        const date = new Date();
        const call = `https://v2.jokeapi.dev/joke/Any?&idRange=${seed[hour]}`;
        console.log("api url: ", call);
        const response = await fetch(call);
        const data = await response.json();
        console.log(data);
        if(data.type === "twopart"){
            setJoke(data.setup + " " + data.delivery);
        }
        else{
            setJoke(data.joke);
        }
    };


    useEffect(() => {
        if(enabled){
            fetchJoke();
        }
    }, [enabled]);


    return (
        <div className={"items-center justify-center " + (enabled ? "" : "invisible")}>
            <p className="mt-2 border border-black rounded-md p-4 font-mono">{joke}</p>
        </div>
    );
}