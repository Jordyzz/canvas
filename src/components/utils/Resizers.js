export default function resizeHandler (currentShape, position, resizer) {
    if (resizer.classList.contains('resizer-bottom-right')) {
        currentShape.props['width'] = position.x - currentShape.props.left;
        currentShape.props['height'] = position.y - currentShape.props.top;
    }
    else if (resizer.classList.contains('resizer-bottom-left')) {
        const width = currentShape.props.width + (currentShape.props.left - position.x);
        const height = currentShape.props.height + (position.y - currentShape.props.top - currentShape.props.height);
        const left = position.x;
    
        if (height > 5) {
            currentShape.props['height'] = height;
        }
        if (width > 5) {
            currentShape.props['width'] = width;
            currentShape.props['left'] = left;
        }
    
    }
    else if (resizer.classList.contains('resizer-top-left')) {
        const width = currentShape.props.width + (currentShape.props.left - position.x);
        const height = currentShape.props.height + (currentShape.props.top -position.y);
        const left = position.x;
        const top = position.y;
    
        if (height > 5) {
            currentShape.props['height'] = height;
            currentShape.props['top'] = top;
        }
        if (width > 5) {
            currentShape.props['width'] = width;
            currentShape.props['left'] = left;
        }
    }
    else {
        const width = position.x - currentShape.props.left;
        const height = currentShape.props.height + (currentShape.props.top -position.y);
        const top = position.y;
    
        if (height > 5) {
            currentShape.props['height'] = height;
            currentShape.props['top'] = top;
        }
        if (width > 5) {
            currentShape.props['width'] = width;
        }
    }

    return currentShape;
}

