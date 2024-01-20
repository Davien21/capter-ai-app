
import { useCallback, useEffect, useState } from "react";
import Router from "next/router";

export function useRouteChangeHandler() {
  const [routeChanging, setRouteChanging] = useState(false);
  const [isPageLoading, setisPageLoading] = useState(false);
  // const [timeoutId, setTimeoutId] = useState<any>(null);

  const startChange = useCallback(() => {
    setisPageLoading(true);
    // clearTimeout(timeoutId);
    // const id = setTimeout(() => setRouteChanging(true), 150);
    setRouteChanging(true)
    // setTimeoutId(id);
  }, []);

  const endChange = useCallback(() => {
    setisPageLoading(false);
    // clearTimeout(timeoutId);
    setRouteChanging(false);
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeStart", startChange);
    Router.events.on("routeChangeComplete", endChange);
    Router.events.on("routeChangeError", endChange);

    return () => {
      Router.events.off("routeChangeStart", startChange);
      Router.events.off("routeChangeComplete", endChange);
      Router.events.off("routeChangeError", endChange);
    };
  }, [endChange, startChange]);

  return { routeChanging, isPageLoading };
}


// import { useCallback, useEffect, useState } from "react";
// import Router from "next/router";

// export function useRouteChangeHandler() {
//   const [routeChanging, setRouteChanging] = useState(false);
//   const [isPageLoading, setisPageLoading] = useState(false);
//   const [timeoutId, setTimeoutId] = useState<any>(null);

//   const startChange = useCallback(() => {
//     setisPageLoading(true);
//     clearTimeout(timeoutId);
//     const id = setTimeout(() => setRouteChanging(true), 150);
//     setTimeoutId(id);
//   }, [setTimeoutId, timeoutId]);

//   const endChange = useCallback(() => {
//     setisPageLoading(false);
//     clearTimeout(timeoutId);
//     setRouteChanging(false);
//   }, [timeoutId]);

//   useEffect(() => {
//     Router.events.on("routeChangeStart", startChange);
//     Router.events.on("routeChangeComplete", endChange);
//     Router.events.on("routeChangeError", endChange);

//     return () => {
//       Router.events.off("routeChangeStart", startChange);
//       Router.events.off("routeChangeComplete", endChange);
//       Router.events.off("routeChangeError", endChange);
//     };
//   }, [endChange, startChange]);

//   return { routeChanging, isPageLoading };
// }

