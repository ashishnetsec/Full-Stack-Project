'use client'

import axios from 'axios';
import { client, notify } from '@/utils/helper';
import React from 'react'
import { useRouter } from 'next/navigation';


export default function StatusBtn({ cat, data }) {
    const router = useRouter()
    const getStatusStyle = (status) => {
        if (status) {
            return "bg-green-100 text-green-600";
        } else if (status == false) {
            return "bg-red-100 text-red-600";
        } else {
            return "bg-gray-100 text-gray-600";
        }
    };

    async function statusHandler() {
        await client.patch(`category/status-update/${cat._id}`, { field: `${data}` }).then(
            (res) => {
                notify(res.data.message, res.data.success)
                if (res.data.success) {
                    router.refresh()
                }
                
            }
        ).catch(
            (err) => {
                notify("internal server error", false)
            }
        )
    }



    return (
        <>
            {   
                
                <span onClick={statusHandler}
                    className={`mx-1 px-3 py-1 text-xs cursor-pointer rounded-full font-medium ${getStatusStyle(
                        cat[data]
                    )}`}
                >
                    {cat[data] ? "Active" : "Inactive"}
                </span>
            }
        </>
    )
}