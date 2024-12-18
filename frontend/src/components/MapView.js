import React from 'react'

export default function MapView() {
  return (
  

  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
  <div style={{ width: '80%', height: '80%' }}> {/* Adjust the width and height as needed */}
    <iframe
      src={`${process.env.PUBLIC_URL}/map.html`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      title="Map"
    ></iframe>
  </div>
</div>
  )
}



