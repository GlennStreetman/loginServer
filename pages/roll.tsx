import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function Roll() {

    const [protectedInfo, setProtectedInfo] = useState("NO");
    const { data: session } = useSession();

    useEffect(()=>{
        fetch('/api/getAdminSecret')
        .then(data=>data.json())
        .then(data=>{
            console.log('data', data)
            setProtectedInfo(data.secret)
        })
    },[session?.user])

    return (
        <div className="grid grid-cols-12 bg-primary mx-1">
            <div className=" col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-4 "></div>
            <div className="col-span-12  sm:col-span-8 md:col-span-6 lg:col-span-4 ">
                <div className="outline-4 border-2 rounded-md  p-2 shadow-md mb-4">
                {`email: ${session?.user?.email}`} <br />
                {/* @ts-ignore */}
                {`roll: ${session?.user?.roll}`} <br />
                {`secret: ${protectedInfo}`} <br />
                </div>
            </div>
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-4 outline-red-500"></div>
        </div>
    );
}

export default Roll;
