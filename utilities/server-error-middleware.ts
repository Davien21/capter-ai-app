import { GetServerSidePropsResult } from "next";

const errorObjects: { [key: string]: GetServerSidePropsResult<{}> } = {
  401: {
    redirect: {
      destination: "/login?reason=unauthorized",
      permanent: true,
    },
  },
  400: {
    redirect: {
      destination: "/404",
      permanent: false,
    },
  },
  404: {
    redirect: {
      destination: "/404",
      permanent: false,
    },
  },
  500: {
    redirect: {
      destination: "/500",
      permanent: false,
    },
  },
  ECONNREFUSED: {
    redirect: {
      destination: "/500",
      permanent: false,
    },
  },
  default: {
    redirect: {
      destination: "/500",
      permanent: false,
    },
  },
};

export const getServerErrorObject = async (status: number) => {
  const code = status?.toString() as keyof typeof errorObjects;
  // if (code === "401") await ServerLogout();

  if (!isNaN(+code) && +code >= 500) {
    return errorObjects[500];
  }
  return errorObjects[code] || errorObjects.default;
};
