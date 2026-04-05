'use client'

import axios from 'axios'
import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { client, notify } from '@/utils/helper'
import { useRouter } from 'next/navigation'

export default function DeleteBtn({cat}) {
    const router = useRouter()

    async function deleteHandler(){
         await client.delete(`category/delete/${cat._id}`).then(
            (res) => {
                notify("Category Deleted Successfully", res.data.success)
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
            <button onClick={deleteHandler}
             className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                <FiTrash2 />
                Delete
            </button>
        </>
    )
}
