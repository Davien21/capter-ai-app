import { useRouter } from "next/router";
import { DefaultSEOHead, HomePageHead, NotFoundPageHead } from "./index";
import { ServerErrorPageHead } from "./500PageHead";
type headsType = { [key: string]: JSX.Element | string };

const PageHeadSetup = () => {
  const heads: headsType = {
    "/": <HomePageHead />,
    "/404": <NotFoundPageHead />,
    "/500": <ServerErrorPageHead />,
    // "/components": <HomePageHead />,
    "/dashboard": "",
    "/_error": <NotFoundPageHead />,
  };
  let route = useRouter().pathname;
  //
  // let A = `${heads[route]}`;
  return (
    <>
      {heads[route] || heads["/"]}
      <DefaultSEOHead />
    </>
  );
};

export default PageHeadSetup;
