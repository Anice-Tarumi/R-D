//MinimapButton.jsx

import React from 'react'
import useGame from '../manager/useGame'

const MinimapButton = () => {
    const map = useGame((state) => state.map)
    const toggleMap = () => {
        map()
    }
    return (
    <button className="minimap-icon" onClick={toggleMap}>
      🗺️
    </button>
    )
}
export default MinimapButton
