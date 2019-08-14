import Circle from './shapes/Circle';
import Rectangle from './shapes/Rectangle';
import Triangle from './shapes/Triangle';
import Square from './shapes/Square';

export const shapeFactory = {
    'Rectangle': {
        shape: Rectangle,
        width: (startLocation, position) => position.x > startLocation.x ? position.x - startLocation.x : startLocation.x - position.x,
        height: (startLocation, position) => position.y > startLocation.y ? position.y - startLocation.y : startLocation.y - position.x
        }, 
    'Circle': {
        shape: Circle,
        width: (startLocation, position) => position.x > startLocation.x ? position.x - startLocation.x : startLocation.x - position.x,
        height: (startLocation, position) => position.y > startLocation.y ? position.y - startLocation.y : startLocation.y - position.x
        },
    'Triangle': {
        shape: Triangle,
        width: (startLocation, position) => position.x > startLocation.x ? position.x - startLocation.x : startLocation.x - position.x,
        height: (startLocation, position) => position.y > startLocation.y ? position.y - startLocation.y : startLocation.y - position.x
        },
    'Square': {
        shape: Square,
        width: (startLocation, position) => position.x > startLocation.x ? position.x - startLocation.x : startLocation.x - position.x,
        height: (startLocation, position) => position.y > startLocation.y ? position.y - startLocation.y : startLocation.y - position.x
        }
    }


