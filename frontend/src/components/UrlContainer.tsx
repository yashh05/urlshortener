import { BACKEND_URL } from "../config";
import { useState } from "react";
import NoURls from "./NoURls";

const UrlContainer = ({ allUrls }: { allUrls: any }) => {
  const [copiedStates, setCopiedStates] = useState(
    Array(allUrls.length).fill(false)
  );

  const handleCopyClick = (index: number, shortendUrl: string) => {
    navigator.clipboard.writeText(BACKEND_URL + "/url/" + shortendUrl);

    const newCopiedStates = [...copiedStates];
    newCopiedStates[index] = true;
    setCopiedStates(newCopiedStates);

    setTimeout(() => {
      const resetCopiedStates = [...copiedStates];
      resetCopiedStates[index] = false;
      setCopiedStates(resetCopiedStates);
    }, 3000);
  };

  return (
    <>
      {allUrls.length === 0 ? (
        <NoURls />
      ) : (
        <div className="relative overflow-x-hidden w-11/12 m-auto mt-20 shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Link
                </th>
                <th scope="col" className="px-6 py-3">
                  Shortened Link
                </th>
                <th scope="col" className="px-6 py-3">
                  Number of Clicks
                </th>
                <th scope="col" className="px-6 py-3">
                  Copy
                </th>
              </tr>
            </thead>
            <tbody>
              {allUrls.map((url: any, index: number) => {
                return (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {url.url}
                    </th>
                    <td className="px-6 py-4 cursor-pointer">
                      <a href={BACKEND_URL + "/url/" + url.shortendUrl}>
                        {url.shortendUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 cursor-pointer">{url.clicks}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleCopyClick(index, url.shortendUrl)}
                        className=" "
                      >
                        {copiedStates[index] ? (
                          <img
                            src="/copied.svg"
                            alt=""
                            className="w-6 transition-opacity duration-300 ease-linear"
                          />
                        ) : (
                          <img
                            src="/copy-url.svg"
                            alt=""
                            className="w-6 transition-opacity duration-300 ease-linear"
                          />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UrlContainer;
