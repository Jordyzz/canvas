import React from 'react';

const Triangle = (props) => {
    const { id, top, left, width, height, opacity, rotate, backgroundColor, startDrag, isSelected, startResize } = props;

    return (
    <div className="triangle-wrapper" style={{
        position: 'absolute',
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px',
        transform: `rotate(${rotate}deg)`,
    }} onMouseDown={ (e) => startDrag(e, id) } >
        
        <div className="Triangle" style={{
            position: 'absolute',
            width: width + 'px',
            height: height + 'px',
            clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
            backgroundColor: backgroundColor,
            opacity: opacity
                }} >
        </div>
        { isSelected && 
            <div className="resize-frame">
                <div className="resizer resizer-bottom-left" onMouseDown={ startResize } />
                <div className="resizer resizer-bottom-right" onMouseDown={ startResize } />
                <div className="resizer resizer-top-left" onMouseDown={ startResize } />
                <div className="resizer resizer-top-right" onMouseDown={ startResize } />
            </div>
        }
    </div>
    );
}

export default Triangle;
