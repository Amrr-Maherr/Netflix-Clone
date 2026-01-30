import React from 'react'

const PageHead = ({title, description,image}: {title: string, description: string, image?: string}) => {
  return (
    <>
       <title>{title}</title>
       <meta name="description" content={description} />
       {image && <meta property="og:image" content={image} />}
    </>
  )
}

export default PageHead