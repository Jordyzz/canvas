import React from 'react';

const Circle = (props) => {
    const { id, top, left, width, height, opacity, rotate, backgroundColor, startDrag, isSelected, startResize } = props;

    return <div className="Circle" id={ id } style={{
        position: 'absolute',
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px',
        backgroundColor: backgroundColor,
        borderRadius: '50%',
        opacity: opacity,
        transform: `rotate(${rotate}deg)`
            }} onMouseDown={ (e) => startDrag(e, id) } > 
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

export default Circle;

