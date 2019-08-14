import React, { Component } from 'react';
import { shapeFactory } from './ShapeFactory';
import { SketchPicker } from 'react-color';

import AppNav from './AppNav';
import ShapeConfig from './ShapeConfig';
import SnackBar from './Snackbar';
import resizeHandler from './utils/Resizers';

class Canvas extends Component {
    state = {
        isDrawing: false,
        isDragging: false,
        isResizing: false,
        startLocation: {x: 0, y: 0},
        currentShape: undefined,
        selectedShape: '',
        selectedColor: 'black',
        shapes: [],
        isMessage: false,
        copiedShape: undefined
    }

    componentDidMount() {
        const canvas = document.getElementById('canvas');
        canvas.addEventListener('mousedown', this.drawStart, false);
        canvas.addEventListener('mousemove', this.drawing, false);
        canvas.addEventListener('mouseup', this.drawEnd, false);
        document.addEventListener('keypress', this.deleteShape, false);
        document.addEventListener('copy', this.copyShape, false);
        document.addEventListener('paste', this.pasteShape, false);
    }

    componentWillUnmount() {
        const canvas = document.getElementById('canvas');
        canvas.removeEventListener('mousedown');
        canvas.removeEventListener('mousemove');
        canvas.removeEventListener('mouseup');
        document.removeEventListener('keypress');
        document.removeEventListener('oncopy');
        document.removeEventListener('paste');
    }

    getCanvasCoordinates = event => {
        const canvas = document.getElementById('canvas').getBoundingClientRect();
        var x = event.clientX - canvas.left,
            y = event.clientY - canvas.top

        return {x: x, y: y};
    }

    updateShapeList = shape => {
        const { shapes } = this.state;
        const index = shapes.indexOf(shape);
        this.setState({
            shapes: [    
                ...shapes.slice(0, index),
                shape,
                ...shapes.slice(index + 1, shapes.length)
            ]
        });
    }

    drawStart = event => {
        const { selectedShape, selectedColor } = this.state;
        if (!(selectedShape in shapeFactory)) {
            console.log("No shape selected!");
            return;
        }
      
        let shape = {
            component: shapeFactory[selectedShape]['shape'],
            props: {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                backgroundColor: selectedColor,
                opacity: 1,
                rotate: 0,
                isSelected: false
            }
        }
        
        this.setState({
            isDrawing: true,
            startLocation: this.getCanvasCoordinates(event),
            currentShape: shape,
            shapes: [
                ...this.state.shapes,
                shape
            ]
        });
    }
    
    drawing = event => {
        const { isDrawing, startLocation, currentShape, shapes, selectedColor, selectedShape } = this.state;

        if (isDrawing) {
            const position = this.getCanvasCoordinates(event);
            const index = shapes.indexOf(currentShape);
            const shape = shapes[index];

            shape.props = {
                ...shape.props,
                top: startLocation.y,
                left: startLocation.x,
                width: shapeFactory[selectedShape]['width'](startLocation, position), 
                height: shapeFactory[selectedShape]['height'](startLocation, position),
                backgroundColor: selectedColor,
            };

            this.updateShapeList(shape);
        }
    }
    
    drawEnd = () => {
        const { isDrawing } = this.state;
        if (!isDrawing)
            return;
        
        this.setState({
            isDrawing: false,
            startLocation: { x: 0, y: 0 },
            currentShape: undefined
        });

        console.log(this.state);
    }

    startDrag = (event, index) => {
        const { isDrawing, currentShape, selectedShape, shapes } = this.state;

        if (isDrawing || selectedShape) {
            return;
        };

        window.addEventListener('mousemove', this.handleDrag, false);
        window.addEventListener('mouseup', this.stopDrag, false);

        if (currentShape) {
            currentShape.props = {
                ...currentShape.props,
                isSelected: false
            }
    
            this.updateShapeList(currentShape);
        }

        const currentSelectedShape = shapes[index];
        const selectedColor = currentSelectedShape.props.backgroundColor;

        currentSelectedShape.props = {
            ...currentSelectedShape.props,
            isSelected: true
        }

        const position = this.getCanvasCoordinates(event);
        const shiftX = position.x - currentSelectedShape.props.left;
        const shiftY = position.y - currentSelectedShape.props.top;

        this.setState({
            isDragging: true,
            currentShape: currentSelectedShape,
            selectedColor: selectedColor,
            shapes: [
                ...shapes.slice(0, index),
                currentSelectedShape,
                ...shapes.slice(index + 1, shapes.length)
            ],
            startLocation: {x: shiftX, y: shiftY}
        });
        console.log("start drag");
    }

    stopDrag = () => {
        window.removeEventListener('mousemove', this.handleDrag);
        window.removeEventListener('mouseup', this.stopDrag);
        console.log("stop drag");

        this.setState({
            isDragging: false,
        });
    }

    handleDrag = event => {
        const { isDragging, isDrawing, isResizing, currentShape, selectedShape, startLocation } = this.state;
        const position = this.getCanvasCoordinates(event);

        if (isDragging && !isDrawing && !isResizing && currentShape && selectedShape === '')
        {
            currentShape.props = {
                ...currentShape.props,
                top: position.y - startLocation.y,
                left: position.x - startLocation.x
            };
            
            this.updateShapeList(currentShape);
        }
    }

    startResize = event => {
        this._resizer = event.target;
        window.addEventListener('mousemove', this.resize, false);
        window.addEventListener('mouseup', this.stopResize, false);
        this.setState({
            isResizing: true
        });

        console.log("start resize");
        event.stopPropagation();
    }

    resize = event => {
        const { isResizing, currentShape } = this.state;
        const position = this.getCanvasCoordinates(event);
        if (isResizing) {
            this.updateShapeList(resizeHandler(currentShape, position, this._resizer));
        }

        event.stopPropagation();
    }

    stopResize = () => {
        this.setState({
            isResizing: false
        });
        window.removeEventListener('mousemove', this.resize, false);
        window.removeEventListener('mouseup', this.stopResize, false);
        console.log("stop resize");
    }
      
    updateColor = () => {
        const { currentShape, selectedColor } = this.state;
        if (currentShape) {
            currentShape.props[`backgroundColor`] = selectedColor;
            this.updateShapeList(currentShape);
        }  
    }

    selectShape = (shapeType) => {
        const { currentShape } = this.state;

        if (currentShape) {
            currentShape.props['isSelected'] = false;
            this.updateShapeList(currentShape);
        }

        this.setState({
          currentShape: undefined,
          selectedShape: shapeType
        });
    }

    openPicker = () => {
        let sketchPicker = document.getElementsByClassName('sketch-picker')[0];
        sketchPicker.style.display = 'block';
    }
    
    handleChangeComplete = color => {
        this.setState({ selectedColor: color.hex });
        let sketchPicker = document.getElementsByClassName('sketch-picker')[0];
        sketchPicker.style.display = 'none';
        this.updateColor();
    }

    deleteShape = event => {
        const { currentShape, shapes } = this.state;
        if (event.code === 'Delete') {
            if (currentShape) {
                const index = shapes.indexOf(currentShape);
                this.snackbarMessage = "Shape has been DELETED!"
                this.setState({
                    shapes: [
                        ...shapes.slice(0, index),
                        ...shapes.slice(index + 1, this.state.shapes.length)
                    ],
                    isMessage: true,
                    currentShape: undefined,
                });
            }
        }
    }

    sendToBack = () => {
        const { currentShape, shapes } = this.state;
        const index = shapes.indexOf(currentShape);

        if (!currentShape)
            return;
    
        this.setState({
            shapes: [
                currentShape,
                ...shapes.slice(0, index),
                ...shapes.slice(index + 1, shapes.length)
            ]
        });    
    }

    bringToFront = () => {
        const { currentShape, shapes } = this.state;
        const index = shapes.indexOf(currentShape);

        if (!currentShape)
            return;
    
        this.setState({
            shapes: [
                ...shapes.slice(0, index),
                ...shapes.slice(index + 1, shapes.length),
                currentShape
            ]
        });    
    }

    onChangeShapeProp = (prop, value) => {
        const { currentShape } = this.state;

        if (currentShape) {
            currentShape.props[prop] = value;
            this.updateShapeList(currentShape);
        } 
    }

    copyShape = () => {
        const { currentShape } = this.state;
        if (currentShape) {
            this.snackbarMessage = "Shape has been COPIED!";
            this.setState({
                isMessage: true,
                copiedShape: currentShape
            });
        }
    }

    pasteShape = () => {
        const { shapes, copiedShape } = this.state;
        if (copiedShape) {
            copiedShape.props['isSelected'] = false;
            const newShape = Object.assign({}, copiedShape);
            this.snackbarMessage = "Shape has beeen PASTED!"
            this.setState({
                isMessage: true,
                shapes: [
                    ...shapes,
                    newShape
                ],
            });
        }
    }

    closeMessage = () => {
        this.setState({
            isMessage: false
        })
    }
   
    render() {
        const { shapes, selectedColor, currentShape, isMessage } = this.state;
        const renderShapes = shapes.map((shape, index) => (
            <shape.component id={ index } key={ index } { ...shape.props } 
                             startDrag={ this.startDrag } 
                             startResize={ this.startResize }
            />
        ));

        return (
            <div className="canvas-container">
                <AppNav selectShape={ this.selectShape } />
                <ShapeConfig selectedColor={ selectedColor } 
                             openPicker={ this.openPicker } 
                             currentShape={ currentShape } 
                             sendToBack={ this.sendToBack }
                             bringToFront={ this.bringToFront } 
                             onChangeShape={ this.onChangeShapeProp }
                             />
                <SketchPicker onChangeComplete={this.handleChangeComplete} />
                <div id="canvas">
                    { renderShapes }
                </div>
                <SnackBar isOpen={ isMessage } message={ this.snackbarMessage } closeMessage={ this.closeMessage } />
            </div>
        );
    }
}

export default Canvas;