'use client'

export default function GetLocalStored({ key }) {

  const storedData = localStorage.getItem(key);

  return storedData;

}
