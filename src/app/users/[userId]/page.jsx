import React from 'react'

export default function UserPage( { params }) {

  const userId = params.userId;

  return (
    <div>
      User Id: {userId}
    </div>
  )
}
