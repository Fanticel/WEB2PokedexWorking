import { useNavigate } from 'react-router';
import { useState, useEffect } from "react";
import { paths } from '../config/path';
import { Entry } from '../components/private/entry';

type EntryProps = {
  name? : string,
  url? : string
}

const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(paths.app.about.getHref());
  };
  const perPage = 20
  const [pokedexRows, setPokedexRows] = useState([]);
  const [nextUrl, setNextUrl] = useState(<></>)
  const [prevUrl, setPrevUrl] = useState(<></>)
  const [request, setRequest] = useState("https://pokeapi.co/api/v2/pokemon?limit="+perPage)

  const  getPokemenData = (request = '') => {
    let promise = fetch(request)
    .then(response => {if (response.ok) return response.json()
                      throw new Error("Something went wrong :(")
    })
    .catch(err => console.log(err))
    return promise
  }
  useEffect(() => {
    async function createPokedex() {
      
      let data = await getPokemenData(request)
      setNextUrl(data.next != null ? <button className='h-9 px-4 py-2 rounded-md bg-red-500 text-white shadow-sm hover:bg-red-200' onClick={()=>{setRequest(data.next)}}>→</button> : <button style={{cursor: 'default'}} className='h-9 px-4 py-2' disabled={true}>→</button>)
      setPrevUrl(data.previous != null ? <button className='h-9 px-4 py-2 rounded-md bg-red-500 text-white shadow-sm hover:bg-red-200' onClick={()=>{setRequest(data.previous)}}>←</button> : <button style={{cursor: 'default'}} className='h-9 px-4 py-2' disabled={true}>←</button>)
      setPokedexRows(data.results)
    }

    createPokedex();
  }, [request]);
  return (
    <>
      <div className="flex-col bg-gradient-to-br from-orange-300 to-red-300">
        <div className="mx-5 max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Pokedex</span>
          </p>
          <div className="mt-8 flex justify-left">
            <div className="inline-flex rounded-md shadow">
              <button
                className="h-13 px-4 py-2 rounded-md bg-red-500 text-white shadow-sm hover:bg-red-200"
              >
                <div className='flex'><span className='mr2'>{<svg
                    fill="currentColor"
                    viewBox="0 -3.5 24 24"
                    className="size-8"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 2H0V14H16V2ZM5 10.5C6.38071 10.5 7.5 9.38071 7.5 8C7.5 6.61929 6.38071 5.5 5 5.5C3.61929 5.5 2.5 6.61929 2.5 8C2.5 9.38071 3.61929 10.5 5 10.5ZM10 5H14V7H10V5ZM14 9H10V11H14V9Z"
                      fill="#000000"
                    />
                  </svg>}</span>
                Pokedex</div>
              </button>
            </div>
            <div className="ml-3 inline-flex">
              <button
                className="h-13 px-4 py-2 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleStart}
              >
                <div className='flex'><span className="mr-2">{<svg
                    className="size-6"
                    viewBox="0 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>message_three_points [#1560]</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-420.000000, -959.000000)"
                        fill="#000000"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M380.872728,808.94 C380.872728,810.045 379.977728,810.94 378.872728,810.94 C377.767728,810.94 376.872728,810.045 376.872728,808.94 C376.872728,807.835 377.767728,806.94 378.872728,806.94 C379.977728,806.94 380.872728,807.835 380.872728,808.94 M375.872728,808.94 C375.872728,810.045 374.977728,810.94 373.872728,810.94 C372.767728,810.94 371.872728,810.045 371.872728,808.94 C371.872728,807.835 372.767728,806.94 373.872728,806.94 C374.977728,806.94 375.872728,807.835 375.872728,808.94 M370.872728,808.94 C370.872728,810.045 369.977728,810.94 368.872728,810.94 C367.767728,810.94 366.872728,810.045 366.872728,808.94 C366.872728,807.835 367.767728,806.94 368.872728,806.94 C369.977728,806.94 370.872728,807.835 370.872728,808.94 M381.441728,817 C381.441728,817 378.825728,816.257 377.018728,816.257 C375.544728,816.257 375.208728,816.518 373.957728,816.518 C369.877728,816.518 366.581728,813.508 366.075728,809.851 C365.403728,804.997 369.268728,800.999 373.957728,801 C377.900728,801 381.002728,803.703 381.732728,807.083 C382.000728,808.318 381.973728,809.544 381.654728,810.726 C381.274728,812.131 381.291728,813.711 381.703728,815.294 C381.914728,816.103 382.302728,817 381.441728,817 M383.917728,815.859 C383.917728,815.859 383.640728,814.794 383.639728,814.79 C383.336728,813.63 383.271728,812.405 383.584728,811.248 C383.970728,809.822 384.035728,808.268 383.687728,806.66 C382.767728,802.405 378.861728,799 373.957728,799 C367.999728,798.999 363.264728,804.127 364.094728,810.125 C364.736728,814.766 368.870728,818.518 373.957728,818.518 C375.426728,818.518 375.722728,818.257 377.019728,818.257 C378.583728,818.257 380.795728,818.919 380.795728,818.919 C382.683728,819.392 384.399728,817.71 383.917728,815.859"
                            id="message_three_points-[#1560]"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  }</span>
                About</div>
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-around'>
          {prevUrl}
          {nextUrl}
        </div>
        {/*encompasses the pokedex itslef*/}
        <div className='flex flex-wrap justify-center'>
          {pokedexRows.map((poke : EntryProps) => (<Entry name={poke.name} url={poke.url}></Entry>))}
        </div> 
      </div>
    </>
  );
};
export default LandingRoute;
