export const storeSession=(key:string,value:string)=>{
  return sessionStorage.setItem(key,value)
}

export const LookInSession = (key: string):string | null => {
  return sessionStorage.getItem(key)
}

export const RemoveSession = (key: string) => {
  return sessionStorage.removeItem(key);
}