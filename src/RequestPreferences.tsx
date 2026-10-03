import {createContext,useContext,useState,type ReactNode} from 'react';
import {findProject,type ProjectId} from './content/portfolio';
type Preferences={referenceId:ProjectId|null;setReferenceId:(id:ProjectId|null)=>void;colors:string[];setColors:(colors:string[])=>void};
const Context=createContext<Preferences|null>(null);
export function RequestPreferencesProvider({children}:{children:ReactNode}) {
  const [referenceId,setReferenceId]=useState<ProjectId|null>(()=>findProject(new URLSearchParams(location.search).get('reference'))?.id??null);
  const [colors,setColors]=useState<string[]>([]);
  return <Context.Provider value={{referenceId,setReferenceId,colors,setColors}}>{children}</Context.Provider>;
}
export function useRequestPreferences(){const value=useContext(Context);if(!value)throw new Error('Request preferences provider is missing');return value;}
