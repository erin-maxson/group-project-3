/*
    <div className="otherUserMarkers" key={p._id}>
            <Marker longitude={p.longitude} latitude={p.latitude} anchor="bottom" >
              <FaMapMarkerAlt style={{ fontSize: viewport.zoom * 7, color: '#f39200' }} />
            </Marker>
            <Popup className='popup' longitude={p.longitude} latitude={p.latitude}
              anchor="bottom"
              closeButton={true}
              closeOnClick={true}
              onClose={() => setShowPopup(false)}>
              <div className='popup-container'>
                <h3 className='pinName'>{p.title}</h3>
                <p className='pinDescription'>{p.description}</p>
                <h4>Reviews:</h4>
                <p className='review'>{p.rating}/5 stars</p>
                TODO: ADD HREF FOR BUTTON HERE
                <button className="addBtn" href='#'>Update this pin!</button>
              </div>
            </Popup>
          </div>
          */