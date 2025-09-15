"use client"

import { Skeleton } from "@/components/ui/skeleton"

const DataTableSkeleton = () => {
    return (
        <div className="flex flex-col space-y-4 mt-[20px]">
            <div className="space-y-2 flex items-center justify-between">
                <Skeleton className="h-8 w-[350px]" />
                <Skeleton className="h-8 w-[200px]" />
            </div>
            <Skeleton className="h-[350px] w-full rounded-xl" />
        </div>
    )
}

export default DataTableSkeleton;
