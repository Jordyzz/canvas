import React from 'react';

const Square = (props) => {
    const { id, top, left, width, height, opacity, rotate, backgroundColor, isSelected, startDrag, startResize } = props;

    return <div className="Square" style={{
        position: 'absolute',
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px',
        backgroundColor: backgroundColor,
        opacity: opacity,
        transform: `rotate(${rotate}deg)`
            }} onMouseDown={ (e) => startDrag(e, id) }>
        { isSelected && 
                <div className="resize-frame">
                    <div className="resizer resizer-bottom-left" onMouseDown={ startResize } />
                    <div className="resizer resizer-bottom-right" onMouseDown={ startResize } />
                    <div className="resizer resizer-top-left" onMouseDown={ startResize } />
                    <div className="resizer resizer-top-right" onMouseDown={ startResize } />
                </div>
        }
    </div>
}

export default Square;