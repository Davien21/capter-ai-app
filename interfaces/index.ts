import { NextPage } from "next";
import { ReactElement } from "react";

export interface ISearchableListItem {
  name: string;
  [key: string]: any;
}

export interface IAPIResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface IAPIErrorResponse {
  data: null;
  message: string;
  success: false;
}

export interface IHTTPErrorResponse {
  url: string;
  status: number;
  statusText: string;
  headers: [Headers];
  counter: 0;
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => React.ReactNode;
};

type Primitive = string | number | boolean | null | undefined;

// Type to extract only string keys
type StringKeys<T> = Extract<keyof T, string>;

export type NestedKeyOf<ObjectType extends object> = {
  [Key in StringKeys<ObjectType>]: ObjectType[Key] extends
    | Array<any>
    | Primitive
    ? Key // Stop recursion if the property is an array or primitive
    : ObjectType[Key] extends object
    ? Key | `${Key}.${NestedKeys<ObjectType[Key]>}`
    : Key;
}[StringKeys<ObjectType>];

// Helper type to get nested keys of an object (second level)
type NestedKeys<T> = T extends object
  ? {
      [K in StringKeys<T>]: T[K] extends Array<any> | Primitive
        ? K // Only include string keys that do not lead to arrays or primitives
        : `${K}.${StringKeys<T[K]>}`;
    }[StringKeys<T>]
  : never;

export interface IProfileUpdate {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  email: string;
  password: string;
  name: string;
  // otp?: string;
}

export type IComponentState = 'idle' | 'success' | 'error' | 'loading';