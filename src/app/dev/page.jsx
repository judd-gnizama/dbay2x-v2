import LocalStorageManager from "@/components/LocalStorageManager";
import TestScript from "@/components/TestScript";

export default function DevPage() {
  return (
    <div className=" justify-self-center place-content-center">
      <TestScript/>
      <LocalStorageManager/>
    </div>
  )
}
