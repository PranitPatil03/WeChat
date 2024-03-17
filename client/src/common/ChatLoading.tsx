import { Skeleton } from "@/components/ui/skeleton";

export function ChatLoading() {
  return (
    <>
      <div className="flex gap-4 border p-2 m-2 mt-4 rounded-xl shadow-sm">
        <div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="font-mono text-lg">
          <Skeleton className="h-[30px] w-[150px] rounded-lg" />
        </div>
      </div>

      {/* <div className="flex flex-col space-y-3">
        <Skeleton className="h-4 w-4 rounded-xl" />
      </div> */}
    </>
  );
}
