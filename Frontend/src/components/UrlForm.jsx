import React from "react";
import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api.js";
import Navbar from "../components/Navbar";

const UrlForm = () => {
  // UseState is a react way to use a var
  //It gives value and a function to update the value

  // useState is a React Hook used to manage state in a component
  // It returns the current state value and a function to update it
  // We must use the setter function to update state so React can re-render the UI
  // Updating state inside event handlers (like onChange) is safe
  // Calling the setter directly during render causes infinite re-renders
  // setUrlValue("abc"); // ❌ during render

  const [url, setUrlValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copy, setCopied] = useState(false);
//   const [slug, setSlug] = useState(""); //new state for custom slug
//  const [isLoggedIn, setIsLoggedIn] = useState(false);

 

  console.log(url);

  // setUrlValue //It re renders the component when called as it updates the value
  //we can use fn inside event handlers to update the state
  //-----------------------------------------------------------------
  // const handleChange = (e) => {
  //   setUrlValue(e.target.value);
  // };

  // <input onChange={handleChange} />
  //--------------------------------------------------------------------

  const handleSubmit = async () => {
    try {

      //fetch by default
      //axios is a popular library for making HTTP requests
      // console.log("Submitted URL:",url);

      // destructure {data} from the axios post response to get only data part
      //API Call to the backend to create short url

      //------------------------------------------------
      const shortUrl = await createShortUrl(url);
      setShortUrl(shortUrl.shortUrl);
      setCopied(false); //reset copied state on new short url generation

      //------------------------------------------------

    //   const { data } = await axios.post("http://localhost:5000/api/create", {
    //     url,
    //   }); //{url:url} in ES6 when key and value are same we can write once
    //   console.log(data);
    //   setShortUrl(data.shortUrl);
    //   setCopied(false); //reset copied state on new short url generation
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
    //  e.preventDefault(); //Prevent page reload on form submit //no refresh
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl); //write shortUrl to clipboard
    setCopied(true); //update copied state

    setTimeout(() => {
      setCopied(false); //reset copied state after 2 seconds
    }, 2000);
  };

  // //Check login status
  // useEffect(()=>{
  //   axiosInstance.get("api/auth/me")
  //   .then(()=> setIsLoggedIn(true))
  //   .catch(()=>setIsLoggedIn(false))
  // })

  //useQuery from react query to manage server state and caching
  //To fetch data on form submit

  //---------------------------------------------------------------------
  // Data goes from frontend to backend 
  //When user wants to give data in backend, in Tanstack Query we use useMutation
  // Data comes from backend to frontend
  //When user wants to get data, in Tanstack Query we use useQuery
  //Dont need useEffect here as useQuery handles fetching on demand

  //isLoading for loading state
  //isPending for pending state
  //---------------------------------------------------------------------
//   const query = useQuery({
//     queryKey: ['shortUrl', url], // Unique key for the query
//     queryFn: handleSubmit, // Function that returns a promise
//     });
//---------------------------------------------------------------------


  return (
<>
<Navbar />
    <div className="space-y-4 ">
      {/* Input group */}
      <div className="flex bg-gray-400 rounded-lg overflow-hidden shadow-lg">
        <input
          type="text"
          value={url} //Bind the input value to the state variable
          placeholder="https://example.com"
          onChange={(e) => setUrlValue(e.target.value)} //Update the url value on input change
          className="flex-2 px-4 py-3 text-black focus:outline-none"
        />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-4 font-medium "
        >
          Shorten URL
        </button>
      
      
      {/* Result */}

      {shortUrl && (
        <div className="mt-10 rounded-xl border border-blue-200 bg-white p-8 shadow-md">
          <p className="mb-2 text-sm font-semibold text-gray-600">
            Your short link is ready
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* Short URL input */}
            <input
              type="text"
              value={shortUrl}
              readOnly
              onClick={(e) => e.target.select()}
              className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Open
              </a>

              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
                onClick={handleCopy}
              >
                {copy ? "Copied!" : "Copy"}{" "}
                {/* Show 'Copied!' if copied is true */}
              </button>
            </div>
            
          </div>
        </div>
      )}
       
    </div>
    
</>

  );
};

export default UrlForm;
